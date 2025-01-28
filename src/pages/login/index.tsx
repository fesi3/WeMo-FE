import LoginBanner from '@/components/auth/login/loginBanner';
import LoginForm from '@/components/auth/login/loginForm';
import useLoginForm from '@/hooks/useLoginForm';
import { LoginFormTypes } from '@/components/auth/type';
import { useMutation } from '@tanstack/react-query';
import { PATHS } from '@/constants/apiPath';
import fetchData from '@/api/fetchData';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { login } from '@/redux/authReducers';
import Link from 'next/link';

function Login() {
  const { loginFormValue, handleChange, errors } = useLoginForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {
    AUTH: { SIGNIN },
  } = PATHS;

  const mutation = useMutation<LoginFormTypes>({
    mutationFn: () =>
      fetchData({
        param: SIGNIN,
        method: 'post',
        requestData: loginFormValue,
      }),
    onSuccess: () => {
      // 로그인이 성공하면 로그인 여부를 상태 업데이트 및 쿼리 invalidate
      // (invalidate 안해주면 요청 GNB 렌더링 되도 요청 안보냄)
      dispatch(login());
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      router.replace('/plans');
    },
    onError: () => {
      alert('로그인이 실패했습니다.');
    },
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutation.mutate();
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <LoginBanner description={'당신의 관심이 만나는 순간'} />
      <LoginForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        loginFormValue={loginFormValue}
        errors={errors}
      />
      <div className="mt-5 flex items-center gap-3">
        <span
          onClick={() => alert('기능 구현 예정 입니다.')}
          className="text-sm text-gray-400"
        >
          아이디 찾기
        </span>
        <div className="h-3 border-l-2" />
        <span
          onClick={() => alert('기능 구현 예정 입니다.')}
          className="text-sm text-gray-400"
        >
          비밀번호 찾기
        </span>
        <div className="h-3 border-l-2" />
        <Link href={'/signup'} rel="noopener noreferrer" target="_blank">
          <span className="text-sm text-gray-400">회원가입</span>
        </Link>
      </div>
    </div>
  );
}

export default Login;
