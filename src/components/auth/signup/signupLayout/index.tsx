import { ReactNode } from 'react';

interface SignupLayoutProps {
  children: ReactNode;
  title: string;
}

function SignupLayout({ children, title }: SignupLayoutProps) {
  return (
    <main>
      <div className="pb-3 pt-3 text-center drop-shadow">
        <span className="text-xl font-semibold">{title}</span>
      </div>
      {children}
    </main>
  );
}

export default SignupLayout;
