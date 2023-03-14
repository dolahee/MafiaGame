import { Box } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { socket } from '../../utils/socket';
import '../styles/Chatting.css';
import Message from './Message';
import MafiaText from './MafiaText';
import GlobalStyle from '../common/GlobalStyle';
import ChattingInput from './ChattingInput';
import ButtonGroup from './ButtonGroup';

export default function Chatting() {
  const { gameStatus, timeStatus } = useSelector((state) => state.status);
  const { messages } = useSelector((state) => state.message);
  const [timer, setTimer] = useState(0);
  const boxRef = useRef();

  useEffect(() => {
    socket.on('timerChange', ({ ms }) => {
      setTimer(ms);
    });
  }, []);

  useEffect(() => {
    boxRef.current.scrollTo({
      behavior: 'smooth',
      top: boxRef.current.scrollHeight,
    });
  }, [messages]);

  return (
    <>
      <GlobalStyle />
      {gameStatus === 'wait' && timer === 0 ? null : (
        <Box
          sx={{
            display: 'flex',
            position: 'sticky',
            top: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
            height: '50px',
            fontSize: '30px',
          }}
        >
          현재 {timer / 1000}초 남았습니다.
        </Box>
      )}
      <Box
        sx={{
          backgroundColor: timeStatus === 'night' ? `#171717` : `#8b7f70`,
          minHeight: '100vh',
          maxHeight: '100vh',
          overflowY: 'auto',
          fontFamily: 'MaplestoryOTFBold',
          zIndex: 10000,
        }}
        ref={boxRef}
      >
        {gameStatus !== 'playing' && <ButtonGroup />}
        <Box sx={{ height: '100vh' }}>
          {messages.map((message) => (
            <Message
              key={message.id}
              msg={message.msg}
              type={message.type}
              fromId={message.fromId}
              toId={message.toId}
            />
          ))}
        </Box>
        <Box
          sx={{
            position: 'sticky',
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ChattingInput />
          <MafiaText />
        </Box>
      </Box>
    </>
  );
}
