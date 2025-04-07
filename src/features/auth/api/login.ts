import { Dispatch, SetStateAction } from 'react';
import useLoginValidation, { loginErrorType } from '../model/login.validation';
import { LoginFormTypes } from '../model/type';
import useLoginMutaion from './login.mutation';

interface useLoginProps {
  setErrors: Dispatch<SetStateAction<loginErrorType>>;
  loginFormValue: LoginFormTypes;
}

// 로그인 폼 submit 이벤트 함수를 관리하는 컴포넌트
// setErrors - 로그인 실패 시, 에러를 업데이트
// loginFormValue - 상위 컴포넌트로 부터 이메일과 비밃번호를 전달받음.
// 유효성 검사 - 유효성 검사 성공 시, 서버에 로그인 요청 진행
function useLogin({ setErrors, loginFormValue }: useLoginProps) {
  const { validateForm } = useLoginValidation();
  const loginMutation = useLoginMutaion({ loginFormValue, setErrors });
  const handleSubmit = async (loginFormValue: LoginFormTypes) => {
    // 폼 검증 실행
    const isValid = validateForm(loginFormValue);
    // 폼이 유효하면 mutation 호출
    if (isValid) {
      loginMutation.mutate();
    }
  };

  return { handleSubmit };
}

export default useLogin;
