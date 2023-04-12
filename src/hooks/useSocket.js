import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { socket } from '../utils/socket';
import { setUserList } from '../store/modules/room';
import { setUser } from '../store/modules/user';

const useSocket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // 방장 유저 정보 저장
    socket.on('saveUserInfoResponse', (user) => {
      dispatch(setUser(user));
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

  // 유저 정보 저장
  socket.on('userListSync', (res) => {
    dispatch(setUserList(res));
  });

  // 메시지
  socket.on('messageResponse', (data) => {
    console.log(data);
  });
  return {};
};

export default useSocket;
