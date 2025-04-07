import { useState } from 'react';

import useLoginValidation from '@/features/auth/model/login.validation';
import useLogin from '@/features/auth/api/login';
import Button from '@/shared/components/Button';
import InputWithMessage from '@/shared/components/input/inputWithError';
import { LoginFormTypes } from '../model/type';
import useLoginHandleChange from '../model/login.handleChage';

export type loginErrorType = Record<keyof LoginFormTypes, string | null>;

function LoginForm() {
  const [loginFormValue, setLoginFormValue] = useState<LoginFormTypes>({
    email: null,
    password: null,
  });
  const { errors, setErrors } = useLoginValidation();
  const { handleChange } = useLoginHandleChange({
    setLoginFormValue,
    setErrors,
  });
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
          inputClassName="border"
          error={emailError}
          autoFocus
        />
        <InputWithMessage
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          onChange={handleChange}
          inputClassName="border"
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
