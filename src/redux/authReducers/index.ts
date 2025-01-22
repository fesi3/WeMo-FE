export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

interface LoginAction {
  type: typeof LOGIN;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

export const login = () => ({ type: LOGIN });
export const logout = () => ({ type: LOGOUT });

export type AuthActionTypes = LoginAction | LogoutAction;

export interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

export default function authReducer(
  state = initialState,
  action: AuthActionTypes,
): AuthState {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: true };
    case LOGOUT:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}
