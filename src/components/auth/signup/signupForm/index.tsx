import Input, { InputProps } from '@/components/shared/input';
import withLabel from '@/components/shared/input/HOC/withLabel';
import Button from '@/components/shared/Button';
import { formValuesType } from '../type';
import withError from '@/components/shared/input/HOC/withError';

interface SignupFormProps {
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formValues: formValuesType;
  errors: { [key: string]: string };
}

const InputWithMessage = withError<InputProps>(Input);
const InputWithLabel = withLabel(InputWithMessage);

function SignupForm(props: SignupFormProps) {
  const { handleSubmit, handleChange, formValues, errors } = props;
  const { name, company, email, password, passwordVerification } = formValues;
  const {
    name: nameError,
    company: companyError,
    email: emailError,
    password: passwordError,
    passwordVerification: passwordVerificationError,
  } = errors;
  return (
    <form className="flex w-[324px] flex-col gap-[68px]">
      <div className="flex flex-col gap-6">
        <InputWithLabel
          id={'name'}
          labelName={'이름'}
          placeholder={'이름을 입력해 주세요.'}
          labelClassName="label"
          onChange={handleChange}
          value={name}
          error={nameError}
        />
        <InputWithLabel
          id={'company'}
          placeholder={'회사명을 입력해 주세요.'}
          labelName={'회사명'}
          labelClassName="label"
          onChange={handleChange}
          value={company}
          error={companyError}
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
            id={'passwordVerification'}
            name={'passwordVerification'}
            aria-label={'passwordVerification'}
            placeholder={'비밀번호를 다시 입력해 주세요.'}
            onChange={handleChange}
            value={passwordVerification}
            error={passwordVerificationError}
          />
        </div>
      </div>
      <Button text={'회원가입'} type="signup" onClick={handleSubmit} />
    </form>
  );
}

export default SignupForm;
