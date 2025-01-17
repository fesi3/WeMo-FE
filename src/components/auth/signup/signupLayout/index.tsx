import { ReactNode } from 'react';

interface SignupLayoutProps {
  children: ReactNode;
  layoutTitle: string;
}

function SignupLayout({ children, layoutTitle }: SignupLayoutProps) {
  return (
    <>
      <header className="border-b-2 pb-3 pt-3 text-center drop-shadow-sm">
        <span className="text-xl font-semibold">{layoutTitle}</span>
      </header>
      {children}
    </>
  );
}

export default SignupLayout;
