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
      alert('로그인 성공');
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
    <div className="mt-36 flex h-screen flex-col items-center gap-[62.5px]">
      <LoginBanner description={'당신의 관심이 만나는 순간'} />
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
