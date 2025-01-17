import LoginBanner from '@/components/auth/login/loginBanner';
import LoginForm from '@/components/auth/login/loginForm';
import useLoginForm from '@/hooks/useLoginForm';
// import { LoginFormTypes } from '@/components/auth/type';
// import { useMutation } from '@tanstack/react-query';
// import { useRouter } from 'next/router';
import { PATHS } from '@/constants/apiPath';
// import fetchData from '@/api/fetchData';
import instance from '@/api/axiosInstance';

function Login() {
  const { loginFormValue, handleChange, errors } = useLoginForm();
  // const router = useRouter();
  const {
    AUTH: { SIGNIN },
  } = PATHS;

  // const mutation = useMutation<LoginFormTypes>({
  //   mutationFn: () =>
  //     fetchData({
  //       param: SIGNIN,
  //       method: 'post',
  //       requestData: loginFormValue,
  //     }),
  //   onSuccess: () => {
  //     alert('로그인 성공');
  //     router.push('/meetings');
  //   },
  //   onError: () => {
  //     alert('로그인이 실패했습니다.');
  //   },
  // });

  // 로그인 폼 제출 함수
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await instance.post(SIGNIN, loginFormValue);
    const accessToken = response.headers['authorization'];
    console.log(accessToken, '---accessToken---');
    // mutation.mutate();
  };
  return (
    <div className="mt-36 flex h-screen flex-col items-center gap-[62.5px]">
      <LoginBanner />
      <LoginForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        loginFormValue={loginFormValue}
        errors={errors}
      />
    </div>
  );
}

export default Login;
