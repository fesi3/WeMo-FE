import { SET_EMAIL, EmailActionTypes } from './emailActionTypes';

export const setEmail = (email: string, nickname: string): EmailActionTypes => {
  return {
    type: SET_EMAIL,
    payload: { email, nickname },
  };
};
