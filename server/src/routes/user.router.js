import express from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../util/prisma';
import { jwt } from 'jsonwebtoken';

const IDRULES = /^[a-z|A-Z|0-9]+$/;
const router = express.Router();
const salt = await bcrypt.getSalt(10);

router.post('/sign-up', async (req, res) => {
  const { id, password } = req.body;
  const isExisUser = await prisma.User.findunique({
    where: {
      id,
      password,
    },
  });

  if (isExisUser) {
    return res.status(400).json({ massage: 'id값이나 pw값을 새롭게 설정해주세요' });
  }

  if (IDRULES.test(id) && IDRULES.test(pw)) {
    return res.status(404).json({ massage: 'id와 pw는 대소문자 9자 이하로만 작성이 가능합니다.' });
  }

  const hashed = await bcrypt.hash('pw', salt);

  await prisma.User.create({
    data: { id, password: hached },
  });

  return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
});

router.post('/sign-in', async (req, res) => {
  const { id, password } = req.body;

  const isExisUser = await prisma.User.findunique({
    where: {
      id,
      password,
    },
  });

  if (!isExisUser) {
    return res
      .status(404)
      .json({ message: '찾는 아이디가 존재하지 않거나 아이디가 존재하지 않습니다.' });
  }

  try {
    const token = await jwt.sign({
      id: isExisUser.id,
    });

    res.setHeader('Authorization', `Bearer ${token}`);

    return res.status(200).json({ message: '로그인 성공', data: `Bearer ${token}` });
  } catch (error) {
    console.error('토큰 생성에 문제가 발생하였습니다.');
    return res.status(400).json({ message: '토큰 생성 오류.' });
  }
});

export default router;
