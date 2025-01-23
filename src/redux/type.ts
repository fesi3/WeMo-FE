export interface UserData {
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

export interface AuthState {
  isLoggedIn: boolean;
  user: UserData | null;
}
