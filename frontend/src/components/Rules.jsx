import { Box, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import React from 'react';

export default function Rules() {
  return (
    <Box>
      <Typography variant="h5" p={3}>
        플레이 방법
      </Typography>
      <Carousel indicators autoPlay height={200} interval={4000}>
        <Typography variant="h5" p={3}>
          소수의 마피아와 다수의 시민으로 나눈다. 시민은 자신 외 남들의 직업을
          모르며 마피아끼리는 서로의 정체를 안다.
        </Typography>
        <Typography variant="h5" p={3}>
          낮과 밤이 번갈아 진행되며, 낮에는 모두가 참여하는 인민재판으로, 밤에는
          마피아들만의 비밀회의로 죽을 사람을 한 명 결정한다.
        </Typography>
        <Typography variant="h5" p={3}>
          시민은 누가 마피아인지, 마피아는 자신의 정체를 숨기며 상대측을 전멸
          시키는 것이 목표이다.
        </Typography>
        <Typography variant="h5" p={3}>
          이제 게임을 시작해 보자.
        </Typography>
      </Carousel>
    </Box>
  );
}
