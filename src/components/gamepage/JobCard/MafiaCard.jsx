import { Box, Button } from '@mui/material';
import React from 'react';

export default function MafiaCard({ onClose }) {
  return (
    <Box sx={{ position: 'absolute', top: 140 }}>
      <Button onClick={onClose}>
        <img src="/images/mafiacard.png" alt="mafiacard" />
      </Button>
    </Box>
  );
}
