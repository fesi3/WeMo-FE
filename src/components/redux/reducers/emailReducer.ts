import { SET_EMAIL, EmailActionTypes } from '../actions/emailActionTypes';

export interface EmailState {
  email: string | null;
  nickname: string | null;
}

const initialState: EmailState = {
  email: null,
  nickname: null,
};

const emailReducer = (
  state = initialState,
  action: EmailActionTypes,
): EmailState => {
  switch (action.type) {
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload.email,
        nickname: action.payload.nickname,
      };
    default:
      return state;
  }
};

export default emailReducer;
