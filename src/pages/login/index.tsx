import LoginForm from '@/components/auth/login/loginForm';

function Login() {
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('로그인 완료!');
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white">
      <div className="mb-7 mt-10 h-[294px] w-[283px] rounded-2xl bg-[#D9D9D9]" />
      <LoginForm handleSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
