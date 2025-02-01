import LoginBanner from '@/components/auth/login/loginBanner';
import LoginForm from '@/components/auth/login/loginForm';
import useLoginForm from '@/hooks/useLoginForm';
import FindInfo from '@/components/auth/login/findInfo';

function Login() {
  const { loginFormValue, handleChange, handleSubmit, errors } = useLoginForm();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <LoginBanner description={'당신의 관심이 만나는 순간'} />
      <LoginForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        loginFormValue={loginFormValue}
        errors={errors}
      />
      <FindInfo />
    </div>
  );
}

export default Login;
