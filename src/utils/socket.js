import { io } from 'socket.io-client';

export const socket = io('http://localhost:3000/', {
  cors: { origin: '*' },
  transports: ['websocket'],
});

export default {};
