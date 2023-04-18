import React, { useMemo, useState } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { socket } from '../../utils/socket';

export default function ProfileCard({
  userId,
  userImg,
  userisReady,
  userSocketId,
  player,
}) {
  const { user } = useSelector((state) => state.user);
  const { gameStatus } = useSelector((state) => state.game);
  const { playerList } = useSelector((state) => state.game);
  const [value, setValue] = useState('');
  const onClickKill = () => {
    setValue(userId);
    socket.emit('messageRequest', { text: value + ' 님을 죽입니다.' });
    if (playerList.length > 0) {
      const myId = playerList.find(({ id }) => id === socket.id);
      if (myId.job === 'mafia' && gameStatus === 'night') {
        socket.emit('mafiaTargetRequest', userSocketId);
      }
    }
  };

  const onClickVote = () => {
    socket.emit('playerTargetRequest', userSocketId);
    console.log(userSocketId);
  };

  const myStatus = useMemo(
    () => playerList.find((players) => players.id === socket.id),

    [playerList]
  );

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
            {player?.status === 'dead' && userId ? (
              <Box
                sx={{
                  width: '100px',
                  height: '100px',
                  backgroundColor: '#171717',
                  borderRadius: '10px',
                }}
              >
                <img
                  src="/images/killimg.png"
                  alt="killimg"
                  style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: '#171717',
                    borderRadius: '10px',
                  }}
                />
              </Box>
            ) : (
              <img
                src={`/images/RandomImg/img${userImg}.png`}
                alt="RandomImg"
                style={{
                  width: '100px',
                  height: '100px',
                }}
              />
            )}
          </Box>

          <Box pl={1}>
            <Box
              sx={{
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'center',
                border: userId === user.nickname ? `2px solid red` : undefined,
                minWidth: '150px',
              }}
            >
              <Typography color="#FFFFF" variant="h7">
                {userId}
              </Typography>
            </Box>
          </Box>

          {gameStatus === 'night' &&
          myStatus?.job === 'mafia' &&
          player?.status === 'alive' &&
          userId ? (
            <Box Box ml={1}>
              <Button
                color="secondary"
                variant="contained"
                onClick={onClickKill}
              >
                죽이기
              </Button>
            </Box>
          ) : null}

          {gameStatus === 'dayVote' &&
          player?.status === 'alive' &&
          myStatus.status === 'alive' &&
          userId ? (
            <Box ml={1}>
              <Button
                color="secondary"
                variant="contained"
                onClick={onClickVote}
              >
                투표
              </Button>
            </Box>
          ) : null}
          {gameStatus === 'end' ? (
            <Box>
              {userisReady === true ? (
                <Typography color="#FFFFF" variant="h7" ml={1}>
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
