import Input, { InputProps } from '@/components/shared/input';
import withLabel from '@/components/shared/input/HOC/withLabel';
import Button from '@/components/shared/Button';
import { SignupFormTypes } from '../../type';
import withError from '@/components/shared/input/HOC/withError';

interface SignupFormProps {
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formValues: SignupFormTypes;
  errors: { [key: string]: string };
}

const InputWithMessage = withError<InputProps>(Input);
const InputWithLabel = withLabel(InputWithMessage);

function SignupForm(props: SignupFormProps) {
  const { handleSubmit, handleChange, formValues, errors } = props;
  const { nickname, companyName, email, password, passwordCheck } = formValues;
  const {
    nickname: nicknameError,
    companyName: companyNameError,
    email: emailError,
    password: passwordError,
    passwordCheck: passwordCheckError,
  } = errors;
  return (
    <form className="flex w-[324px] flex-col gap-[68px]">
      <div className="flex flex-col gap-6">
        <InputWithLabel
          id={'nickname'}
          labelName={'닉네임'}
          placeholder={'닉네임을 입력해 주세요.'}
          labelClassName="label"
          onChange={handleChange}
          value={nickname}
          error={nicknameError}
        />
        <InputWithLabel
          id={'companyName'}
          placeholder={'회사명을 입력해 주세요.'}
          labelName={'회사명'}
          labelClassName="label"
          onChange={handleChange}
          value={companyName}
          error={companyNameError}
        />
        <InputWithLabel
          type={'email'}
          id={'email'}
          placeholder={'이메일 주소를 입력해 주세요.'}
          labelName={'이메일 주소'}
          labelClassName="label"
          onChange={handleChange}
          value={email}
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
            value={password}
            error={passwordError}
          />
          <InputWithMessage
            type={'password'}
            id={'passwordCheck'}
            name={'passwordCheck'}
            aria-label={'passwordCheck'}
            placeholder={'비밀번호를 다시 입력해 주세요.'}
            onChange={handleChange}
            value={passwordCheck}
            error={passwordCheckError}
          />
        </div>
      </div>
      <Button text={'회원가입'} type="signup" onClick={handleSubmit} />
    </form>
  );
}

export default SignupForm;
