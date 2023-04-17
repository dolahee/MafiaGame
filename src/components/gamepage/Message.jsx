import { Box } from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { socket } from '../../utils/socket';

export default function Message({ type, text, sender }) {
  const { user } = useSelector((state) => state.user);
  const { playerList } = useSelector((state) => state.game);

  const myStatus = useMemo(
    () => playerList.find((player) => player.id === socket.id),

    [playerList]
  );

  if (type === 'mafiaChat' && myStatus.job === 'mafia') {
    return (
      <Box
        sx={{
          textAlign: 'center',
          backgroundColor: '#E1E1E1',
          width: '100%',
          p: 1,
          mb: 3,
          borderRadius: '5px',
        }}
      >
        {text}
      </Box>
    );
  }

  if (type === 'userNotice') {
    return (
      <Box
        sx={{
          textAlign: 'center',
          backgroundColor: '#E1E1E1',
          width: '100%',
          p: 1,
          mb: 3,
          borderRadius: '5px',
        }}
      >
        {text}
      </Box>
    );
  }
  if (type === 'gameNotice') {
    return (
      <Box
        sx={{
          textAlign: 'center',
          backgroundColor: '#FFA7A7',
          width: '100%',
          p: 1,
          mb: 3,
          borderRadius: '5px',
        }}
      >
        {text}
      </Box>
    );
  }
  if (sender === user.nickname && type === 'userChat') {
    return (
      <Box sx={{ textAlign: 'right', mr: 3 }}>
        <Box sx={{ display: 'inline-block', textAlign: 'left' }}>
          {sender}
          <Box
            sx={{
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#943B3B',
              height: '50px',
              width: '100%',
              p: 1,
              mb: 3,
              borderRadius: '5px',
            }}
          >
            {text}
          </Box>
        </Box>
      </Box>
    );
  }
  if (sender !== socket.id && type === 'userChat') {
    return (
      <Box sx={{ textAlign: 'left', ml: 3 }}>
        <Box sx={{ display: 'inline-block', textAlign: 'right' }}>
          {sender}
          <Box
            sx={{
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#E1E1E1',
              height: '50px',
              width: '100%',
              p: 1,
              mb: 3,
              borderRadius: '5px',
            }}
          >
            {text}
          </Box>
        </Box>
      </Box>
    );
  }
}
