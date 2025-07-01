import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import useLoginValidation, { loginErrorType } from '../model/login.validation';
import { LoginFormTypes } from '../model/type';
import useLoginMutaion from './login.mutation';
import { LOGIN_ERROR_MESSAGE } from '../model/message';
import { login } from '@/shared/lib/redux/authReducers';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

interface useLoginProps {
  setErrors: Dispatch<SetStateAction<loginErrorType>>;
  loginFormValue: LoginFormTypes;
}

// 로그인 폼 submit 이벤트 함수를 관리하는 컴포넌트
// setErrors - 로그인 실패 시, 에러를 업데이트
// loginFormValue - 상위 컴포넌트로 부터 이메일과 비밃번호를 전달받음.
// 유효성 검사 - 유효성 검사 성공 시, 서버에 로그인 요청 진행
function useTestLogin({ setErrors, loginFormValue }: useLoginProps) {
  const { validateForm } = useLoginValidation();
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const loginMutation = useLoginMutaion({ loginFormValue, setErrors });
  console.log(loginMutation);
  const handleSubmit = async (loginFormValue: LoginFormTypes) => {
    const { email, password } = loginFormValue;
    // 입력창이 모두 빈칸일 때, 에러 메세지 업데이트
    if (!email && !password) {
      setErrors({
        ['email']: LOGIN_ERROR_MESSAGE.EMAIL_EMPTY,
        ['password']: LOGIN_ERROR_MESSAGE.PASSWORD_EMPTY,
      });
    } else {
      // 폼 검증 실행
      const isValid = validateForm(loginFormValue);
      // 폼이 유효하면 setCookie
      if (isValid) {
        console.log('---로그인 성공---');
        // 예시: 로그인 성공 후 쿠키 세
        // 임시 토큰 생성 (백엔드 없음)
        const token = { accessToken: 'dummy-access-token' };
        if (token && token.accessToken) {
          document.cookie = `accessToken=${encodeURIComponent(token.accessToken)}; path=/;`;
        }
        dispatch(login());

        // 로그인 성공 후, 원래 이동하려던 경로로 리다이렉트
        const from = searchParams?.get('from');
        if (from) {
          router.push(from);
        } else {
          router.push('/');
        }
      }
    }
  };

  return { handleSubmit };
}

export default useTestLogin;
