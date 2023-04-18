const initalState = {
  /** 게임중인 유저 */
  playerList: [],
  /** dayDiscussion(낮 토론 시간),dayVote(낮 투표 시간),dayFinal(최후변론), dayFinalVote(찬성반대투표시간), night(밤) ,end(게임끝) */
  gameStatus: 'end',
  /** 게임 타이머 */
  timer: 0,
  /** 투표 받은 사람 */
  vote: '',
};

const SET_PLAYER_LIST = ' SET_PLAYER_LIST';
const SET_GAME_STATUS = 'SET_GAME_STATUS';
const GET_TIMER = 'GET_TIMER';
const GET_VOTE = 'GET_VOTE';

export const setPlayerList = (playerList) => ({
  type: SET_PLAYER_LIST,
  payload: { playerList },
});

export const setTimeStatus = (gameStatus) => ({
  type: SET_GAME_STATUS,
  payload: { gameStatus },
});

export const getTimer = (timer) => ({
  type: GET_TIMER,
  payload: { timer },
});

export const getVote = (vote) => ({
  type: GET_VOTE,
  payload: { vote },
});

const GameReducer = (state = initalState, action) => {
  switch (action.type) {
    case SET_PLAYER_LIST:
      return { ...state, playerList: action.payload.playerList };
    case SET_GAME_STATUS:
      return { ...state, gameStatus: action.payload.gameStatus };
    case GET_TIMER:
      return { ...state, timer: action.payload.timer };
    case GET_VOTE:
      return { ...state, vote: action.payload.vote };
    default:
      return state;
  }
};

export default GameReducer;
