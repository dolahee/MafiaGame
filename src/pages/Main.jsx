import { Box, Button, Grid, TextField, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import RefreshIcon from '@mui/icons-material/Refresh';
import NickNameData from '../NickNameData.json';
import Rules from '../components/Rules';
import { socket } from '../utils/socket';

export default function Main() {
  const navigate = useNavigate();
  const randomNickname =
    NickNameData.determiners[
      Math.floor(Math.random() * NickNameData.determiners.length)
    ] +
    NickNameData.animals[
      Math.floor(Math.random() * NickNameData.animals.length)
    ];

  const [nickName, setNickName] = useState(randomNickname);
  const changeNickName = (event) => setNickName(event.target.value);

  const img1 = '/images/RandomImg/img1.png';
  const img2 = '/images/RandomImg/img2.png';
  const img3 = '/images/RandomImg/img3.png';
  const img4 = '/images/RandomImg/img4.png';
  const img5 = '/images/RandomImg/img5.png';
  const randomImgArr = [img1, img2, img3, img4, img5];
  const randomIndexs = Math.floor(Math.random() * randomImgArr.length);
  const randomImgIndex = randomImgArr[randomIndexs];
  const [imgIndex, setImgindex] = useState(randomIndexs);
  const [randomImg, setRandomImg] = useState(randomImgIndex);

  const changeImg = () => {
    const randomIndex = Math.floor(Math.random() * randomImgArr.length);
    const randomImgs = randomImgArr[randomIndex];
    setRandomImg(randomImgs);
    setImgindex(randomIndex);
  };

  const gameStart = () => {
    socket.emit('saveUserInfoRequest', nickName, imgIndex);
    socket.emit('createRoomRequest');
  };

  useEffect(() => {
    socket.on('saveUserInfoResponse', (user) => {
      console.log(user);
    });
    socket.on('createRoomResponse', (room) => {
      console.log(room);
      navigate(`/gamepage/${room}`);
    });
  }, []);

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100vh' }}
    >
      <Grid item md={8}>
        <Paper sx={{ p: 10 }}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Box>
                <Box>
                  <Button onClick={changeImg}>
                    <RefreshIcon />
                  </Button>
                </Box>
                <img src={randomImg} alt="img" style={{ width: '100%' }} />
                <Box mb={2}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    onChange={changeNickName}
                    value={nickName}
                    variant="outlined"
                    size="small"
                  />
                </Box>
                <Box>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={gameStart}
                  >
                    Game Start
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Paper sx={{ height: '100%' }}>
                <Rules />
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
