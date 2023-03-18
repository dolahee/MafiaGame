import {
  Box,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import React, { useEffect, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { socket } from '../utils/socket';
import useStream from '../hooks/useStream';
import Chatting from '../components/gamepage/Chatting';
import ProfileCard from '../components/gamepage/ProfileCard';
import MafiaCard from '../components/gamepage/JobCard/MafiaCard';
import Citizencard from '../components/gamepage/JobCard/Citizencard';

export default function GamePage() {
  const navigate = useNavigate();
  const { timeStatus } = useSelector((state) => state.status);
  const { peerList, stream } = useStream();
  const { userList, myJob } = useSelector((state) => state.room);
  const [showMafiaCard, setShowMafiaCard] = useState(false);
  const [showCitizencardCard, setShowCitizencardCard] = useState(false);
  const [open, setOpen] = useState(false);

  // 게임 방 인원 초과 시 나오는 다이얼로그
  useEffect(() => {
    socket.on('room full', () => {
      setOpen(true);
    });
  }, []);

  const handleClose = () => {
    navigate('/');
    setOpen(false);
  };

  // 직업 카드 배정 후 닫기
  useEffect(() => {
    if (myJob === 'mafia') {
      setShowMafiaCard(true);
    }
    if (myJob === 'citizen') {
      setShowCitizencardCard(true);
    }
  }, [myJob]);

  const onCloseCard = useCallback(() => {
    setShowMafiaCard(false);
    setShowCitizencardCard(false);
  }, []);

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: timeStatus === 'night' ? `#2f2f2e` : `#F6F6F6` }}
    >
      <Grid item md={4}>
        {/* 입장인원 제한 알림 다이얼로그 */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>입장 인원 초과</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              입장 인원이 초과하여 게임에 참여할 수 없습니다.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>

        <Paper
          sx={{
            height: '100vh',
            overflow: 'auto',
            display: 'grid',
            alignItems: 'center',
            backgroundColor: timeStatus === 'night' ? `#2f2f2e` : `#F6F6F6`,
          }}
        >
          {userList.map((user, index) =>
            index <= 9 ? (
              <Box key={index}>
                <ProfileCard
                  userId={user}
                  peerList={peerList}
                  stream={stream}
                />
              </Box>
            ) : null
          )}
        </Paper>
      </Grid>
      <Grid item md={8}>
        <Paper sx={{ height: '100vh', overflowY: 'auto' }}>
          <Chatting />

          {/* 직업 카드 배정 */}
          {showMafiaCard ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <MafiaCard onClose={onCloseCard} />
            </Box>
          ) : null}

          {showCitizencardCard ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Citizencard onClose={onCloseCard} />
            </Box>
          ) : null}
        </Paper>
      </Grid>
    </Grid>
  );
}
