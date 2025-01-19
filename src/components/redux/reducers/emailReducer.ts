import { SET_EMAIL, EmailActionTypes } from '../actions/emailActionTypes';

interface EmailState {
  email: string | null;
}

const initialState: EmailState = {
  email: null,
};

const emailReducer = (
  state = initialState,
  action: EmailActionTypes,
): EmailState => {
  switch (action.type) {
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    default:
      return state;
  }
};

export default emailReducer;
