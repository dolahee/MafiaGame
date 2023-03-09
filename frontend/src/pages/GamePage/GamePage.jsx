import { Box, Grid, Paper } from '@mui/material';
import React, { useEffect, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import { socket } from '../../utils/socket';
import useSocket from '../../hooks/useSocket';
import useStream from '../../hooks/useStream';
import Chatting from '../../components/gamepage/Chatting';
import ProfileCard from '../../components/gamepage/ProfileCard';
import MafiaCard from '../../components/gamepage/JobCard/MafiaCard';
import Citizencard from '../../components/gamepage/JobCard/Citizencard';
import ButtonGroup from '../../components/gamepage/ButtonGroup';

export default function GamePage() {
  useSocket();
  const navigate = useNavigate();
  const { peerList, stream } = useStream();
  const { gameStatus } = useSelector((state) => state.status);
  const { userList, myJob } = useSelector((state) => state.room);
  const [showMafiaCard, setShowMafiaCard] = useState(false);
  const [showCitizencardCard, setShowCitizencardCard] = useState(false);

  useEffect(() => {
    socket.on('room full', () => {
      Navigate('/Main');
      alert('This rooom is not available');
    });
  }, []);

  useEffect(() => {
    if (myJob === 'mafia') {
      setShowMafiaCard(true);
    }
  }, [myJob]);

  useEffect(() => {
    if (myJob === 'citizen') {
      setShowCitizencardCard(true);
    }
  }, [myJob]);

  const onCloseCard = useCallback(() => {
    setShowMafiaCard(false);
  }, []);

  const onCloseCitizencardCard = useCallback(() => {
    console.log('클릭');
    setShowCitizencardCard(false);
  }, []);

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item md={4}>
        <Paper sx={{ height: '100vh', overflow: 'auto' }}>
          {userList.map((user, index) =>
            index <= 9 ? (
              <Box mb={1} key={index}>
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
      <Grid item md={7}>
        <Paper sx={{ height: '100vh' }}>
          <Chatting />
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
              <Citizencard onClose={onCloseCitizencardCard} />
            </Box>
          ) : null}
        </Paper>
      </Grid>
      <Grid item md={1}>
        {gameStatus !== 'playing' && <ButtonGroup />}
      </Grid>
    </Grid>
  );
}
