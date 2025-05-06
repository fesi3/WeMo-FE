import { ReactNode } from 'react';
import LoginBanner from '@/pages/auth/login/ui/loginBanner';
import FindInfo from '@/pages/auth/login/ui/findInfo';

interface LoginFormContainerProps {
  children: ReactNode;
  requestStatus?: 'success' | 'error' | 'idle' | 'pending';
}

function LoginFormContainer({ children }: LoginFormContainerProps) {
  return (
    <>
      <LoginBanner description={'당신의 관심이 만나는 순간'} />
      {children}
      <FindInfo />
    </>
  );
}

export default LoginFormContainer;
