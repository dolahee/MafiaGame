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
import { useNavigate, useParams } from 'react-router';
import { socket } from '../utils/socket';
import Chatting from '../components/gamepage/Chatting';
import ProfileCard from '../components/gamepage/ProfileCard';
import MafiaCard from '../components/gamepage/JobCard/MafiaCard';
import Citizencard from '../components/gamepage/JobCard/Citizencard';

export default function GamePage() {
  const navigate = useNavigate();
  const { timeStatus } = useSelector((state) => state.status);
  const { userList, myJob } = useSelector((state) => state.room);
  const { user } = useSelector((state) => state.user);
  const [showMafiaCard, setShowMafiaCard] = useState(false);
  const [showCitizencardCard, setShowCitizencardCard] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    navigate('/');
    setOpen(false);
  };

  const { room } = useParams();
  useEffect(() => {
    socket.emit('joinRoomRequest', room);
  }, []);

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
          {userList.map((usr, index) => (
            <Box key={index}>
              <ProfileCard
                userId={usr.nickname}
                userImg={usr.imgIdx}
                userisReady={usr.isReady}
              />
            </Box>
          ))}
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
