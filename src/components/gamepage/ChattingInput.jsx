import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { socket } from '../../utils/socket';

export default function ChattingInput() {
  const { gameStatus } = useSelector((state) => state.game);
  const { finalistId, mySocketId } = useSelector((state) => state.room);
  const [value, setValue] = useState('');
  const { playerList } = useSelector((state) => state.game);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleSubmit = (event) => {
    socket.emit('messageRequest', { text: value });
    event.preventDefault();
    setValue('');
  };

  if (gameStatus === 'dayFinal' && finalistId !== mySocketId) return null;
  if (gameStatus === 'night') return null;

  if (playerList.length > 0) {
    const myId = playerList.find(({ id }) => id === socket.id);
    if (myId.status !== 'alive') {
      return null;
    }
  }

  const onClickYes = () => {
    socket.emit('finalVote', { from_id: mySocketId, agree: true });
  };

  const onClickNo = () => {
    socket.emit('finalVote', { from_id: mySocketId, agree: false });
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
      {gameStatus === 'dayFinalVote' ? (
        <>
          <Button
            variant="contained"
            color="primary"
            sx={{ m: 1 }}
            onClick={onClickYes}
          >
            찬성
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ m: 1 }}
            onClick={onClickNo}
          >
            반대
          </Button>
        </>
      ) : null}

      <TextField
        value={value}
        id="outlined-basic"
        label=""
        variant="outlined"
        sx={{ width: '100%', fontFamily: 'MaplestoryOTFBold' }}
        onChange={handleChange}
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
