import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { socket } from '../utils/socket';
import { setUserList } from '../store/modules/room';
import { setUser } from '../store/modules/user';
import { addMessage } from '../store/modules/message';

const useSocket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // 방장 유저 정보 저장
    socket.on('saveUserInfoResponse', (user) => {
      dispatch(setUser(user));
    });

    // 유저 정보 저장
    socket.on('userListSync', (res) => {
      dispatch(setUserList(res));
    });

    socket.on('createRoomResponse', (room) => {
      navigate(`/gamepage/${room}`);
    });

    // 타이머
    socket.on('timerSync', ({ ms }) => {});

    // 게임시작
    socket.on('gameReadySync', (res) => {
      dispatch(setUserList(res));
    });
  }, []);

  // 메시지
  socket.on('messageResponse', (data) => {
    dispatch(addMessage(data));
  });
  return {};
};

export default useSocket;
