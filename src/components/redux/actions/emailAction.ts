import { SET_EMAIL, EmailActionTypes } from './emailActionTypes';

export const setEmail = (email: string): EmailActionTypes => {
  return {
    type: SET_EMAIL,
    payload: email,
  };
};
