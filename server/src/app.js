import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http-server';
import UserRouter from '../src/routes/user.router.js';
import errorMiddleware from '../src/middleware/error.middleware.js';

dotenv.config();
const app = express();
const server = createServer(app);

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('tower_defense_client'));

app.use('/api', [UserRouter]);
app.use(errorMiddleware);

server.listen(PORT, async () => {
  console.log(`${PORT}번 서버에 접속하였습니다!`);
});
