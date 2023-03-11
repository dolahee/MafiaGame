import React from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { socket } from '../../utils/socket';

export default function ProfileCard({ userId }) {
  const { timeStatus } = useSelector((state) => state.status);
  const { mySocketId, myJob, killedUserList, mafiaPickId } = useSelector(
    (state) => state.room
  );

  const onClickKill = () => {
    if (myJob === 'mafia' && timeStatus === 'night') {
      socket.emit('mafiaVoted', { killed_id: userId, from_id: mySocketId });
      console.log(mySocketId);
    }
  };

  const onClickVote = () => {
    socket.emit('peopleVoted', {
      from_id: mySocketId,
      killed_id: userId,
    });
  };

  return (
    <Grid container spacing={2} direction="row" justifyContent="center">
      <Grid item md={10}>
        <Paper
          sx={{
            backgroundColor: '#8B7F70',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '100px',
              height: '100px',
              backgroundColor: '#E4D9C6',
              borderRadius: '3px',
            }}
          >
            {killedUserList.includes(userId) ? (
              <Box
                sx={{
                  width: '100px',
                  height: '100px',
                  backgroundColor: '#171717',
                  borderRadius: '10px',
                }}
              >
                <img
                  src="./images/killimg.png"
                  alt="killimg"
                  style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: '#171717',
                    borderRadius: '10px',
                  }}
                />
              </Box>
            ) : null}
            {userId === mafiaPickId &&
            myJob === 'mafia' &&
            timeStatus === 'night' ? (
              <img
                src="./images/killimg.png"
                alt="killimg"
                style={{
                  width: '100px',
                  height: '100px',
                }}
              />
            ) : null}

            <img
              src="/images/RandomImg/img1.png"
              alt="killimg"
              style={{
                width: '100px',
                height: '100px',
              }}
            />
          </Box>

          <Box pl={1}>
            <Box
              sx={{
                backgroundColor: '#D9D9D9',
                borderRadius: '5px',
                width: '150px',
                display: 'flex',
                justifyContent: 'center',
                border: userId === mySocketId ? `2px solid red` : undefined,
              }}
            >
              <Typography variant="h7">{userId}</Typography>
            </Box>
          </Box>
          {myJob === 'mafia' && timeStatus === 'night' ? (
            <Button onClick={onClickKill}>선택</Button>
          ) : null}
          {timeStatus === 'dayVote' ? (
            <Button onClick={onClickVote}> 투표 </Button>
          ) : null}
        </Paper>
      </Grid>
    </Grid>
  );
}
