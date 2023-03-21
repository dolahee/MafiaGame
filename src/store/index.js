import { combineReducers } from 'redux';
import room from './modules/room';
import MessageReducer from './modules/message';
import StatusReducer from './modules/status';
import UserReducer from './modules/user';

export default combineReducers({
  room,
  user: UserReducer,
  message: MessageReducer,
  status: StatusReducer,
});
