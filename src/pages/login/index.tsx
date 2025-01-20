import LoginBanner from '@/components/auth/login/loginBanner';
import LoginForm from '@/components/auth/login/loginForm';
import useLoginForm from '@/hooks/useLoginForm';
// import { LoginFormTypes } from '@/components/auth/type';
// import { useMutation } from '@tanstack/react-query';
// import { useRouter } from 'next/router';
import { PATHS } from '@/constants/apiPath';
// import fetchData from '@/api/fetchData';
import axios from 'axios';
import { useRouter } from 'next/router';
//임시주석(김세환) import decodeToken from '@/utils/decodeToken';

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

  const router = useRouter();
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}${SIGNIN}`,
      loginFormValue,
      { withCredentials: true },
    );

    const token = response.headers['authorization'];
    if (!token) return;
    localStorage.setItem('accessToken', token);
    router.push('meetings');
  };
  //윤성님 코드 임시로 주석처리 했습니다!
  // 로그인 폼 제출 함수 (나중에 서버측에서 세팅하도록 수정 예정)
  // const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   try {
  //     const response = await instance.post(SIGNIN, loginFormValue);
  //     const accessToken = response.headers['authorization'];
  //     if (accessToken) {
  //       const decodedJWT = decodeToken(accessToken);
  //       console.log(decodedJWT, '---decodedJWT---');
  //       // 일단 임의로 옵션 넣음...
  //       document.cookie = `user_email=${decodedJWT.USER_EMAIL}; expires=Mon, 20 Jan 2025 12:00:00 UTC; path=/;`;
  //     }
  //   } catch (error) {
  //     alert('로그인 실패');
  //     console.log('로그인 에러 발생', error);
  //   }
  //   // mutation.mutate();
  // };
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
