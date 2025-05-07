import { Dispatch, SetStateAction, useState } from 'react';

import Button from '@/shared/components/Button';
import InputWithLabel from '@/entities/auth/ui/input/inputWithLabel';
import InputWithMessage from '@/entities/auth/ui/input/inputWithError';

import useRegisterHandleChange from '../model/register.handleChange';
import { RegisterFormTypes } from '../model/type';
import { RegisterErrorType } from '../model/register.validation';

interface RegisterFormProps {
  handleSubmit: (registerFormValue: RegisterFormTypes) => void;
  errors: RegisterErrorType;
  setErrors: Dispatch<SetStateAction<RegisterErrorType>>;
  requestStatus?: 'success' | 'error' | 'idle' | 'pending';
}

function RegisterForm({
  handleSubmit,
  errors,
  setErrors,
  requestStatus,
}: RegisterFormProps) {
  const [registerFormValue, setRegisterFormValue] = useState<RegisterFormTypes>(
    {
      email: null,
      nickname: null,
      companyName: null,
      password: null,
      passwordCheck: null,
    },
  );

  const { handleChange } = useRegisterHandleChange({
    setRegisterFormValue,
    setErrors,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(registerFormValue);
      }}
      className="flex w-[324px] flex-col gap-[42.5px]"
    >
      <div className="flex flex-col gap-6">
        <InputWithLabel
          id={'nickname'}
          labelName={'이름'}
          placeholder={'이름을 입력해 주세요.'}
          labelClassName="label"
          onChange={handleChange}
          error={errors.nickname}
          autoFocus
        />
        <InputWithLabel
          id={'companyName'}
          placeholder={'회사명을 입력해 주세요.'}
          labelName={'회사명'}
          labelClassName="label"
          onChange={handleChange}
          error={errors.companyName}
        />
        <InputWithLabel
          type={'email'}
          id={'email'}
          placeholder={'이메일 주소를 입력해 주세요.'}
          labelName={'이메일 주소'}
          labelClassName="label"
          onChange={handleChange}
          error={errors.email}
        />
        <div className="flex flex-col gap-6">
          <InputWithLabel
            type={'password'}
            id={'password'}
            placeholder={'비밀번호를 입력해 주세요.'}
            labelName={'비밀번호'}
            labelClassName="label"
            onChange={handleChange}
            error={errors.password}
          />
          <InputWithMessage
            type={'password'}
            id={'passwordCheck'}
            name={'passwordCheck'}
            aria-label={'passwordCheck'}
            placeholder={'비밀번호를 다시 입력해 주세요.'}
            onChange={handleChange}
            error={errors.passwordCheck}
          />
        </div>
      </div>
      <Button
        text={'회원가입'}
        size={'large'}
        width={324}
        height={42}
        disabled={
          Object.values(errors).some((error) => (error ? true : false)) ||
          requestStatus === 'pending' ||
          requestStatus === 'success'
        }
      />
    </form>
  );
}

export default RegisterForm;
