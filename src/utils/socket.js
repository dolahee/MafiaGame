import { io } from 'socket.io-client';

export const socket = io('https://dolahee.github.io/MafiaGame/', {
  cors: { origin: '*' },
  transports: ['websocket'],
});

export default {};
