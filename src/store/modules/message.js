const ADD_MESSAGE = 'ADD_MESSAGE';

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: { message },
});

const initialState = {
  messages: [],
};

const MessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
      };
    default:
      return state;
  }
};

export default MessageReducer;
