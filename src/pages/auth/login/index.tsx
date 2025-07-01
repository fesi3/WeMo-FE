import LoginBanner from '@/pages/auth/login/ui/loginBanner';
// import LoginForm from '@/features/auth/ui/loginForm';
import FindInfo from '@/pages/auth/login/ui/findInfo';
import TestLoginForm from '@/features/auth/ui/testLoginForm';

export function Login() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <LoginBanner description={'당신의 관심이 만나는 순간'} />
      {/* <LoginForm /> */}
      <TestLoginForm />
      <FindInfo />
    </div>
  );
}
