export const SET_EMAIL = 'SET_EMAIL';
export const CLEAR_EMAIL = 'CLEAR_EMAIL';

export type EmailActionTypes =
  | { type: typeof SET_EMAIL; payload: string }
  | { type: typeof CLEAR_EMAIL };
