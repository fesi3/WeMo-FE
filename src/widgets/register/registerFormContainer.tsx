import { ReactNode } from 'react';

interface RegisterFormContainerProps {
  children: ReactNode;
  requestStatus?: 'success' | 'error' | 'idle' | 'pending';
}

function RegisterFormContainer({ children }: RegisterFormContainerProps) {
  return <div className="mt-[80px] flex w-full justify-center">{children}</div>;
}

export default RegisterFormContainer;
