import { ReactNode } from 'react';

interface SignupLayoutProps {
  children: ReactNode;
  layoutTitle: string;
}

function SignupLayout({ children, layoutTitle }: SignupLayoutProps) {
  return (
    <main>
      <div className="border-b-2 pb-3 pt-3 text-center drop-shadow">
        <span className="text-xl font-semibold">{layoutTitle}</span>
      </div>
      {children}
    </main>
  );
}

export default SignupLayout;
