import { Dispatch, SetStateAction, useState } from 'react';

import Button from '@/shared/components/Button';
import InputWithMessage from '@/entities/auth/ui/input/inputWithError';

import { loginErrorType, LoginFormTypes } from '../model/type';
import useLoginHandleChange from '../model/login.handleChage';

interface LoginFormProps {
  errors: loginErrorType;
  setErrors: Dispatch<SetStateAction<loginErrorType>>;
  handleSubmit: (loginFormValue: LoginFormTypes) => Promise<void>;
  requestStatus?: 'success' | 'error' | 'idle' | 'pending';
}

// 로그인 폼 컴포넌트
// 유효성 검사, onChange, onSubmit 함수 관심사 분리 완료
function LoginForm({
  errors,
  setErrors,
  handleSubmit,
  requestStatus,
}: LoginFormProps) {
  // 이메일과 비밀번호를 상태로 관리
  const [loginFormValue, setLoginFormValue] = useState<LoginFormTypes>({
    email: null,
    password: null,
  });

  const { email: emailError, password: passwordError } = errors;

  // 이메일과 비밀번호 입력창의 이벤트 핸들러 함수
  const { handleChange } = useLoginHandleChange({
    setLoginFormValue,
    setErrors,
  });

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
        disabled={
          requestStatus === 'pending' ||
          requestStatus === 'success' ||
          emailError ||
          passwordError
            ? true
            : false
        }
      />
    </form>
  );
}

export default LoginForm;
