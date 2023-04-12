import { Box } from '@mui/material';
import React from 'react';
import { socket } from '../../utils/socket';

export default function Message({ type, text, sender }) {
  if (sender === socket.id) {
    return (
      <Box sx={{ textAlign: 'right', mr: 3 }}>
        <Box sx={{ display: 'inline-block', textAlign: 'left' }}>
          닉네임
          <Box
            sx={{
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#943B3B',
              height: '50px',
              width: '100%',
              p: 1,
              mb: 3,
              borderRadius: '5px',
            }}
          >
            {text}
          </Box>
        </Box>
      </Box>
    );
  }
  if (sender !== socket.id && type === 'userChat') {
    return (
      <Box sx={{ textAlign: 'left', ml: 3 }}>
        <Box sx={{ display: 'inline-block', textAlign: 'right' }}>
          닉네임
          <Box
            sx={{
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#E1E1E1',
              height: '50px',
              width: '100%',
              p: 1,
              mb: 3,
              borderRadius: '5px',
            }}
          >
            {text}
          </Box>
        </Box>
      </Box>
    );
  }
}
