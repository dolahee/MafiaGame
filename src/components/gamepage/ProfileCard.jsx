import React from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { socket } from '../../utils/socket';

export default function ProfileCard({ userId, userImg, userisReady }) {
  const { user } = useSelector((state) => state.user);
  const { playerList, gameStatus } = useSelector((state) => state.game);
  const { myJob, mySocketId, killedUserList, mafiaPickId } = useSelector(
    (state) => state.room
  );

  const onClickKill = () => {
    if (playerList.length > 0) {
      const myId = playerList.find(({ id }) => id === socket.id);
      if (myId.job === 'mafia' && gameStatus === 'night') {
        socket.emit('mafiaVoted', { killed_id: userId, from_id: mySocketId });
      }
    }
  };

  const onClickVote = () => {
    console.log(userId);
  };

  return (
    <Grid
      container
      spacing={1}
      direction="row"
      justifyContent="center"
      sx={{ backgroundColor: gameStatus === 'night' ? `#2f2f2e` : `#F6F6F6` }}
    >
      <Grid item md={11}>
        <Paper
          sx={{
            backgroundColor: gameStatus === 'night' ? `#2f2f2e` : `#943B3B`,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '100px',
              height: '100px',
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
            gameStatus === 'night' ? (
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
              src={`/images/RandomImg/img${userImg}.png`}
              alt="RandomImg"
              style={{
                width: '100px',
                height: '100px',
              }}
            />
          </Box>

          <Box pl={1}>
            <Box
              sx={{
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'center',
                border: userId === user.nickname ? `2px solid red` : undefined,
              }}
            >
              <Typography color="#FFFFF" variant="h7">
                {userId}
              </Typography>
            </Box>
          </Box>

          {myJob === 'mafia' && gameStatus === 'night' && userId ? (
            <Button color="secondary" variant="contained" onClick={onClickKill}>
              죽이기
            </Button>
          ) : null}

          {gameStatus === 'dayVote' && userId ? (
            <Button color="secondary" variant="contained" onClick={onClickVote}>
              투표
            </Button>
          ) : null}
          {gameStatus === 'end' ? (
            <Box>
              {userisReady === true ? (
                <Typography color="#FFFFF" variant="h7" ml={5}>
                  Ready
                </Typography>
              ) : null}
            </Box>
          ) : null}
        </Paper>
      </Grid>
    </Grid>
  );
}
