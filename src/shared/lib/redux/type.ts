import { UserData } from '@/shared/types/mypageType';

export interface AuthState {
  isLoggedIn: boolean;
  user: UserData | null;
}
