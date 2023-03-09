import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';

export default function ProfileCard({ userId }) {
  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
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
              }}
            >
              <Typography variant="h7">{userId}</Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
