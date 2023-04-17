import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { socket } from '../../utils/socket';

export default function KillButton({ userNickname, userSocketId }) {
  const { playerList, gameStatus } = useSelector((state) => state.game);
  const { myStatus } = useSelector((state) => state.status);

  if (playerList.length > 0) {
    const myId = playerList.find(({ id }) => id === socket.id);
    if (myId.job !== 'mafia') {
      return null;
    }
  }

  if (gameStatus !== 'night') return null;
  if (myStatus === 'dead') return null;

  const onClickKill = () => {
    if (playerList.length > 0) {
      const myId = playerList.find(({ id }) => id === socket.id);
      if (myId.job === 'mafia' && gameStatus === 'night') {
        socket.emit('mafiaTargetRequest', userSocketId);
        console.log(userNickname, '님을 죽입니다.');
      }
    }
  };
  return (
    <Button color="secondary" variant="contained" onClick={onClickKill}>
      죽이기
    </Button>
  );
}
