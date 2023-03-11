import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { socket } from '../../utils/socket';

export default function ButtonGroup() {
  const [isReady, setIsReady] = useState(false);
  const [isCaptain, setIsCaptain] = useState(false);
  const exitBtn = useRef();
  const readyBtn = useRef();
  // const startBtn = useRef();
  const userList = useSelector((state) => state.room.userList);

  // userList의 첫번째 socket.id 가 captain, userList 바뀔때마다 update
  const navigate = useNavigate();

  useEffect(() => {
    if (userList.indexOf(socket.id) === 0) {
      setIsCaptain(true);
    } else {
      setIsCaptain(false);
    }
    if (!isCaptain && userList.length >= 4) {
      setIsReady(false);
    } else {
      setIsReady(true);
    }
  }, [userList]);

  const gameReady = () => {
    setIsReady(true);
    if (isCaptain) {
      socket.emit('gameStart', {
        from_id: socket.id,
        userList,
      });
    } else {
      socket.emit('gameReady', {
        from_id: socket.id,
      });
    }
  };

  // const gameStart = () => {
  //   socket.emit('gameStart', {
  //     from_id: socket.id,
  //   });
  // };

  // 버튼 클릭 시 페이지 주소가 복사 됨
  const [copy, setcopy] = useState(false);
  const inviteFriends = () => {
    navigator.clipboard.writeText(window.location.href);
    setcopy(true);
    setTimeout(() => {
      setcopy(false);
    }, 3000);
  };

  socket.on('readyComplete', () => {
    setIsReady(false);
  });

  return (
    <Box sx={{ display: 'flex' }}>
      <Box m={1}>
        <Button
          ref={readyBtn}
          variant="contained"
          color="primary"
          size="large"
          sx={{
            fontFamily: 'MaplestoryOTFBold',
            '* .Mui_disabled': {
              background: '#E38989',
              fontFamily: 'MaplestoryOTFBold',
            },
          }}
          onClick={gameReady}
          disabled={isReady}
        >
          {isCaptain ? 'Game START' : 'READY'}
        </Button>
        {copy && <Typography variant="body1"> </Typography>}
      </Box>
      <Box m={1}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={inviteFriends}
          sx={{ fontFamily: 'MaplestoryOTFBold', fontWeight: 'bolder' }}
        >
          초대하기
        </Button>
        {copy && <Typography variant="body1">주소복사완료</Typography>}
      </Box>
      <Box m={1}>
        <Button
          ref={exitBtn}
          variant="contained"
          color="secondary"
          size="large"
          sx={{ fontFamily: 'MaplestoryOTFBold', fontWeight: 'bolder' }}
          onClick={() => {
            navigate('/');
            socket.emit('exitRoom', {
              from_id: socket.id,
            });
          }}
        >
          나가기
        </Button>
        {copy && <Typography variant="body1"> </Typography>}
      </Box>
    </Box>
  );
}
