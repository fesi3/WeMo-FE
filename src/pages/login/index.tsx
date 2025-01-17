import LoginBanner from '@/components/auth/login/loginBanner';
import LoginForm from '@/components/auth/login/loginForm';
import useLoginForm from '@/hooks/useLoginForm';

function Login() {
  const { loginFormValue, handleChange } = useLoginForm();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('로그인 완료!');
  };
  return (
    <div className="mt-36 flex h-screen flex-col items-center gap-[62.5px]">
      <LoginBanner />
      <LoginForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        loginFormValue={loginFormValue}
        errors={{}}
      />
    </div>
  );
}

export default Login;
