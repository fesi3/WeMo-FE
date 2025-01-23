import { UserData, AuthState } from '../type';
// 액션 타입
const SET_USER = 'SET_USER';
const CLEAR_USER = 'CLEAR_USER';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
//액션
export const login = () => ({ type: LOGIN });
export const logout = () => ({ type: LOGOUT });
export const setUser = (user: UserData) => ({ type: SET_USER, payload: user });
export const clearUser = () => ({ type: CLEAR_USER });
// 초기 상태
const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};
// 리듀서
export default function authReducer(
  state = initialState,
  action: { type: string; payload?: UserData },
): AuthState {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: true };
    case LOGOUT:
      return { ...state, isLoggedIn: false, user: null };
    case SET_USER:
      return { ...state, ...action.payload };
    case CLEAR_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}
