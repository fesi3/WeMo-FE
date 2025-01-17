import LoginForm from '@/components/auth/login/loginForm';
import useLoginForm from '@/hooks/useLoginForm';
import Image from 'next/image';

function Login() {
  const { loginFormValue, handleChange } = useLoginForm();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('로그인 완료!');
  };
  return (
    <div className="mt-36 flex h-screen flex-col items-center gap-[62.5px]">
      <div className="flex flex-col items-center gap-6">
        <Image
          width={'235'}
          height={'178'}
          src={'/assets/images/logo-with-color.png'}
          alt="logo-image"
        />
        <p className="text-[15px] font-bold text-primary-10">
          {'당신의 관심이 만나는 순간'}
        </p>
      </div>
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
