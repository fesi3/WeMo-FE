import LoginBanner from '@/pages/login/ui/loginBanner';
import LoginForm from '@/features/auth/ui/loginForm';
import FindInfo from '@/pages/login/ui/findInfo';

export function Login() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <LoginBanner description={'당신의 관심이 만나는 순간'} />
      <LoginForm />
      <FindInfo />
    </div>
  );
}
