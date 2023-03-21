const initState = {
  // 유저 정보
  user: '',
};

// ACTION TYPE
const SET_USER = 'SET_USER';

// 액션 생성 함수
export const setUser = (user) => ({
  type: SET_USER,
  payload: { user },
});

// REDUCER
export default function UserReducer(state = initState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
}
