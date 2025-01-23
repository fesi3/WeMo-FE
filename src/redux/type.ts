export interface UserData {
  companyName: string;
  createdAt: string;
  email: string;
  joinedPlanCount: number;
  likedPlanCount: number;
  loginType: string;
  nickname: string;
  profileImagePath: string;
  writtenReviewCount: number;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: UserData | null;
}
