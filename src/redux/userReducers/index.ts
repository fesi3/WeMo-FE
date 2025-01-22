export interface UserState {
  email: string;
  nickname: string;
  profileImagePath: string;
  companyName: string;
  loginType: string;
  createdAt: string;
  joinedPlanCount: number;
  likedPlanCount: number;
  writtenReviewCount: number;
}

const SET_USER = 'SET_USER';
const CLEAR_USER = 'CLEAR_USER';

export const setUser = (user: UserState) => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

const initialState: UserState = {
  email: '',
  nickname: '',
  profileImagePath: '',
  companyName: '',
  loginType: '',
  createdAt: '',
  joinedPlanCount: 0,
  likedPlanCount: 0,
  writtenReviewCount: 0,
};

export default function userReducer(
  state = initialState,
  action: { type: string; payload?: UserState },
): UserState {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload };
    case CLEAR_USER:
      return initialState;
    default:
      return state;
  }
}
