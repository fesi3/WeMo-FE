export const SET_EMAIL = 'SET_EMAIL';

export type EmailActionTypes = {
  type: typeof SET_EMAIL;
  payload: {
    email: string;
    nickname: string;
  };
};
