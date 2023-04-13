import { combineReducers } from 'redux';
import room from './modules/room';
import MessageReducer from './modules/message';
import StatusReducer from './modules/status';
import UserReducer from './modules/user';
import Gamereducer from './modules/game';

export default combineReducers({
  room,
  user: UserReducer,
  message: MessageReducer,
  status: StatusReducer,
  game: Gamereducer,
});
