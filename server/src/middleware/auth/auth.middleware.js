import jwt from 'jsonwebtoken';

export default async function (req, res, next) {
  try {
    const { Authorization } = req.headers;
    if (!Authorization) {
      throw new Error('토큰이 존재하지 않습니다.');
    }

    const [tokenType, token] = Authorization.split(' ');

    const decode = jwt.verify(Authorization, process.env.SECRET_KEY);
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다.',
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        code: 401,
        message: '유효하지 않은 토큰입니다.',
      });
    }
  }
}
