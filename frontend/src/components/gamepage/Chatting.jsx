import { Box, Button } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { socket } from '../../utils/socket';
import '../styles/Chatting.css';
import Message from './Message';
import MafiaText from './MafiaText';
import GlobalStyle from '../common/GlobalStyle';
import ChattingInput from './ChattingInput';
import DMText from './DMText';

export default function Chatting() {
  const [only, setOnly] = useState(true);
  const [isDM, setIsDM] = useState(false);
  const { timeStatus, gameStatus } = useSelector((state) => state.status);
  const { userList } = useSelector((state) => state.room);
  const { messages } = useSelector((state) => state.message);
  const changeToDM = () => setIsDM(!isDM);
  const [timer, setTimer] = useState(0);
  const boxRef = useRef();

  useEffect(() => {
    socket.on('timerChange', ({ ms }) => {
      setTimer(ms);
    });
  }, []);

  useEffect(() => {
    setOnly(!userList.filter((e) => e !== '').length > 1);
  }, [userList]);

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
          backgroundColor: '#8B7F70',
          borderRadius: '10px',
          minHeight: 600,
          maxHeight: 600,
          overflowY: 'auto',
          fontFamily: 'MaplestoryOTFBold',
          zIndex: 10000,
        }}
        ref={boxRef}
      >
        <Box>
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
          {timeStatus !== 'night' && (
            <Button
              onClick={changeToDM}
              sx={{ fontFamily: 'MaplestoryOTFBold' }}
              disabled={only}
            >
              {isDM ? 'quitDM' : 'sendDM'}
            </Button>
          )}

          {isDM ? <DMText userList={userList} /> : <ChattingInput />}
          <MafiaText />
        </Box>
      </Box>
    </>
  );
}
