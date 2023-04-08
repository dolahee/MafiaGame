import { Box } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { socket } from '../../utils/socket';
import '../styles/Chatting.css';
import Message from './Message';
import MafiaInput from './MafiaInput';
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
      <Box
        sx={{
          backgroundColor: timeStatus === 'night' ? `#171717` : `#F6F6F6`,
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
          {gameStatus === 'wait' && timer === 0 ? null : (
            <Box
              sx={{
                backgroundColor: '#A96262',
                fontSize: '30px',
              }}
            >
              현재 {timer / 1000}초 남았습니다.
            </Box>
          )}

          {gameStatus !== 'playing' && <ButtonGroup />}
        </Box>

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
          <MafiaInput />
        </Box>
      </Box>
    </>
  );
}