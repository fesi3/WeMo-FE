export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

interface LoginAction {
  type: typeof LOGIN;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

export interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

export type AuthActionTypes = LoginAction | LogoutAction;

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

export const login = (): LoginAction => ({ type: LOGIN });
export const logout = (): LogoutAction => ({ type: LOGOUT });
