import useRegisterFormValidation from '../model/register.validation';
import useRegister from '../api/register';
import Button from '@/shared/components/Button';
import InputWithLabel from '@/shared/components/input/inputWithLabel';
import InputWithMessage from '@/shared/components/input/inputWithError';

function RegisterForm() {
  const { handleChange, errors } = useRegisterFormValidation();

  const { handleSubmit } = useRegister();

  const {
    nickname: nicknameError,
    companyName: companyNameError,
    email: emailError,
    password: passwordError,
    passwordCheck: passwordCheckError,
  } = errors;

  return (
    <form className="flex w-[324px] flex-col gap-[42.5px]">
      <div className="flex flex-col gap-6">
        <InputWithLabel
          id={'nickname'}
          labelName={'이름'}
          placeholder={'이름을 입력해 주세요.'}
          labelClassName="label"
          onChange={handleChange}
          error={nicknameError}
        />
        <InputWithLabel
          id={'companyName'}
          placeholder={'회사명을 입력해 주세요.'}
          labelName={'회사명'}
          labelClassName="label"
          onChange={handleChange}
          error={companyNameError}
        />
        <InputWithLabel
          type={'email'}
          id={'email'}
          placeholder={'이메일 주소를 입력해 주세요.'}
          labelName={'이메일 주소'}
          labelClassName="label"
          onChange={handleChange}
          error={emailError}
        />
        <div className="flex flex-col gap-6">
          <InputWithLabel
            type={'password'}
            id={'password'}
            placeholder={'비밀번호를 입력해 주세요.'}
            labelName={'비밀번호'}
            labelClassName="label"
            onChange={handleChange}
            error={passwordError}
          />
          <InputWithMessage
            type={'password'}
            id={'passwordCheck'}
            name={'passwordCheck'}
            aria-label={'passwordCheck'}
            placeholder={'비밀번호를 다시 입력해 주세요.'}
            onChange={handleChange}
            error={passwordCheckError}
          />
        </div>
      </div>
      <Button
        text={'회원가입'}
        size={'large'}
        onClick={handleSubmit}
        width={324}
        height={42}
        disabled={
          nicknameError ||
          companyNameError ||
          emailError ||
          passwordError ||
          passwordCheckError
            ? true
            : false
        }
      />
    </form>
  );
}

export default RegisterForm;
