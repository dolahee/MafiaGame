import { io } from 'socket.io-client';

export const socket = io('http://knsan189.iptime.org:4000/', {
  cors: { origin: '*' },
  transports: ['websocket'],
});

export default {};