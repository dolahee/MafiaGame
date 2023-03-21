import React from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { socket } from '../../utils/socket';

export default function ProfileCard({ userId, userImg }) {
  const { timeStatus } = useSelector((state) => state.status);
  const { user } = useSelector((state) => state.user);
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
    <Grid
      container
      spacing={1}
      direction="row"
      justifyContent="center"
      sx={{ backgroundColor: timeStatus === 'night' ? `#2f2f2e` : `#F6F6F6` }}
    >
      <Grid item md={11}>
        <Paper
          sx={{
            backgroundColor: timeStatus === 'night' ? `#2f2f2e` : `#943B3B`,
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
          {myJob === 'mafia' && timeStatus === 'night' && userId ? (
            <Button color="secondary" variant="contained" onClick={onClickKill}>
              선택
            </Button>
          ) : null}
          {timeStatus === 'dayVote' && userId ? (
            <Button color="secondary" variant="contained" onClick={onClickVote}>
              투표
            </Button>
          ) : null}
        </Paper>
      </Grid>
    </Grid>
  );
}
