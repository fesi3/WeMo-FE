import { Dispatch, SetStateAction } from 'react';
import useLoginValidation, { loginErrorType } from '../model/login.validation';
import { LoginFormTypes } from '../model/type';
import useLoginMutaion from './login.mutation';
import { LOGIN_ERROR_MESSAGE } from '../model/message';

interface useLoginProps {
  setErrors: Dispatch<SetStateAction<loginErrorType>>;
  loginFormValue: LoginFormTypes;
}

// 로그인 폼 submit 이벤트 함수를 관리하는 컴포넌트
// setErrors - 로그인 실패 시, 에러를 업데이트
// loginFormValue - 상위 컴포넌트로 부터 이메일과 비밃번호를 전달받음.
// 유효성 검사 - 유효성 검사 성공 시, 서버에 로그인 요청 진행
function useLogin({ setErrors, loginFormValue }: useLoginProps) {
  const { isLoginFormValid } = useLoginValidation();
  const loginMutation = useLoginMutaion({ loginFormValue, setErrors });

  const handleSubmit = async (loginFormValue: LoginFormTypes) => {
    const { email, password } = loginFormValue;
    // 입력창이 모두 빈칸일 때, 에러 메세지 업데이트
    if (!email && !password) {
      setErrors({
        ['email']: LOGIN_ERROR_MESSAGE.EMAIL_EMPTY,
        ['password']: LOGIN_ERROR_MESSAGE.PASSWORD_EMPTY,
      });
    } else {
      // 폼 검증 실행 -> 폼이 유효하면 mutation 호출
      if (isLoginFormValid(loginFormValue)) {
        loginMutation.mutate();
      }
    }
  };

  return { handleSubmit };
}

export default useLogin;
