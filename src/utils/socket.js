import { io } from 'socket.io-client';

export const socket = io('https://mafia-server.bok2.kr', {
  cors: { origin: '*' },
  transports: ['websocket'],
});

export default {};
