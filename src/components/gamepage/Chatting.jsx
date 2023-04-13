import { Box } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import '../styles/Chatting.css';
import Message from './Message';
import MafiaInput from './MafiaInput';
import GlobalStyle from '../common/GlobalStyle';
import ChattingInput from './ChattingInput';
import ButtonGroup from './ButtonGroup';

export default function Chatting() {
  const { gameStatus, timer } = useSelector((state) => state.game);
  const { messages } = useSelector((state) => state.message);

  const boxRef = useRef();
  console.log(gameStatus);
  useEffect(() => {
    boxRef.current.scrollTo({
      behavior: 'smooth',
      top: boxRef.current.scrollHeight,
    });
  }, [messages]);

  return (
    <>
      <GlobalStyle />
      <Box
        sx={{
          backgroundColor: gameStatus === 'night' ? `#171717` : `#F6F6F6`,
          minHeight: '100vh',
          maxHeight: '100vh',
          overflowY: 'auto',
          fontFamily: 'MaplestoryOTFBold',
          zIndex: 10000,
        }}
        ref={boxRef}
      >
        <Box
          sx={{
            display: 'flex',
            position: 'sticky',
            top: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {gameStatus === 'end' && timer === 0 ? null : (
            <Box
              sx={{
                backgroundColor: '#A96262',
                fontSize: '30px',
              }}
            >
              현재 {timer / 1000}초 남았습니다.
            </Box>
          )}

          {gameStatus !== 'end' ? null : <ButtonGroup />}
        </Box>

        <Box sx={{ height: '100vh' }}>
          {messages.map((message, index) => (
            <Message
              key={index}
              sender={message.sender}
              text={message.text}
              type={message.type}
            />
          ))}
        </Box>
        <Box
          sx={{
            position: 'fixed',
            width: '50%',
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ChattingInput />

          <MafiaInput />
        </Box>
      </Box>
    </>
  );
}
