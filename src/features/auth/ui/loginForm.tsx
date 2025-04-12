import { useState } from 'react';

import useLoginValidation from '@/features/auth/model/login.validation';
import useLogin from '@/features/auth/api/login';
import Button from '@/shared/components/Button';
import InputWithMessage from '@/shared/components/input/inputWithError';
import { LoginFormTypes } from '../model/type';
import useLoginHandleChange from '../model/login.handleChage';

export type loginErrorType = Record<keyof LoginFormTypes, string | null>;

// 로그인 폼 컴포넌트
// 유효성 검사, onChange, onSubmit 함수 관심사 분리 완료
function LoginForm() {
  // 이메일과 비밀번호를 상태로 관리
  const [loginFormValue, setLoginFormValue] = useState<LoginFormTypes>({
    email: null,
    password: null,
  });

  // 유효성 검사를 통해 errors를 반환
  // handleChange과 handleSubmit 함수에 setErrors 함수를 props로 전달해 각 함수 실행 시, error가 발생하면 setError를 할 수 있도록 설계.
  const { errors, setErrors } = useLoginValidation();

  // 이메일과 비밀번호 입력창의 이벤트 핸들러 함수
  const { handleChange } = useLoginHandleChange({
    setLoginFormValue,
    setErrors,
  });

  // 폼 제출 핸들러 함수
  const { handleSubmit } = useLogin({ loginFormValue, setErrors });
  const { email: emailError, password: passwordError } = errors;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(loginFormValue);
      }}
      className="flex flex-col gap-6 p-[10px]"
    >
      <div className="flex w-[320px] flex-col gap-5">
        <InputWithMessage
          id="email"
          placeholder="이메일을 입력해주세요."
          onChange={handleChange}
          error={emailError}
          autoFocus
        />
        <InputWithMessage
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          onChange={handleChange}
          error={passwordError}
        />
      </div>
      <Button
        text={'로그인'}
        size={'large'}
        width={320}
        height={42}
        disabled={emailError || passwordError ? true : false}
      />
    </form>
  );
}

export default LoginForm;
