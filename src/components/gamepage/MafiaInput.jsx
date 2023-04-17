import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { socket } from '../../utils/socket';

export default function MafiaInput() {
  const { myStatus } = useSelector((state) => state.status);
  const { gameStatus } = useSelector((state) => state.game);
  const { playerList } = useSelector((state) => state.game);
  const [value, setValue] = useState('');

  if (gameStatus !== 'night') return null;
  if (myStatus === 'dead') return null;

  if (playerList.length > 0) {
    const myId = playerList.find(({ id }) => id === socket.id);
    if (myId.job !== 'mafia') {
      return null;
    }
  }

  if (playerList.length > 0) {
    const myId = playerList.find(({ id }) => id === socket.id);
    if (myId.status !== 'alive') {
      return null;
    }
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleSubmit = (event) => {
    socket.emit('messageRequest', { text: value });
    event.preventDefault();
    setValue('');
  };
  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: 'white',
        justifyContent: 'center',
        width: '100%',
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <TextField
        value={value}
        sx={{ width: '100%', fontFamily: 'MaplestoryOTFBold' }}
        onChange={handleChange}
        placeholder="마피아는 죽일 사람을 같은 마피아와 함께 상의해서 골라 주세요"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          height: '100%',
          alignItems: 'center',
          fontFamily: 'MaplestoryOTFBold',
          position: 'absolute',
          right: 0,
        }}
      >
        전송
      </Button>
    </Box>
  );
}
