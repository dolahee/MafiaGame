import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { socket } from '../../utils/socket';

export default function ButtonGroup() {
  const [isReadys, setIsReady] = useState(false);
  const exitBtn = useRef();
  const readyBtn = useRef();
  const userList = useSelector((state) => state.room.userList);
  const navigate = useNavigate();
  // 버튼 클릭 시 페이지 주소가 복사 됨
  const [copy, setcopy] = useState(false);
  const [url, setUrl] = useState(window.location.href);

  const inviteFriends = () => {
    const modifiedUrl = `${url}/Invite`;
    navigator.clipboard.writeText(modifiedUrl);
    console.log(setUrl);
    setcopy(true);
  };
  const handleClose = () => {
    setcopy(false);
  };

  // 게임 준비와 게임 스타트

  const gameReady = () => {
    setIsReady(true);
    socket.emit('gameReadyRequest', true);
  };

  const gameStart = () => {
    setIsReady(true);
    socket.emit('gameStartRequest', true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {/* 주소 복사 완료 다이얼로그 */}
      <Dialog open={copy} onClose={inviteFriends}>
        <DialogTitle>주소 복사 완료</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            친구를 초대해서 게임을 즐겨보세요.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Box m={1}>
        {userList[0].id === socket.id ? (
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
            onClick={gameStart}
            disabled={isReadys}
          >
            Game START
          </Button>
        ) : (
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
            disabled={isReadys}
          >
            READY
          </Button>
        )}
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
      </Box>
    </Box>
  );
}
