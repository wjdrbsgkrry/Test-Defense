import { Server } from 'socket.io';

const initSocket = (server) => {
  const io = new Server();
  io.attach(server);
};
