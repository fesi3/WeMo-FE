import Input, { InputProps } from '@/components/shared/input';
import withLabel from '@/components/shared/input/HOC/withLabel';
import Button from '@/components/shared/Button';
import { formValuesType } from '../type';

interface SignupFormProps {
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formValues: formValuesType;
}

const InputWithLabel = withLabel<InputProps>(Input);

function SignupForm(props: SignupFormProps) {
  const { handleSubmit, handleChange, formValues } = props;
  const { name, company, email, password, passwordVerification } = formValues;
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
        />
        <InputWithLabel
          id={'company'}
          placeholder={'회사명을 입력해 주세요.'}
          labelName={'회사명'}
          labelClassName="label"
          onChange={handleChange}
          value={company}
        />
        <InputWithLabel
          type={'email'}
          id={'email'}
          placeholder={'이메일 주소를 입력해 주세요.'}
          labelName={'이메일 주소'}
          labelClassName="label"
          onChange={handleChange}
          value={email}
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
          />
          <Input
            type={'password'}
            id={'passwordVerification'}
            name={'passwordVerification'}
            aria-label={'passwordVerification'}
            placeholder={'비밀번호를 다시 입력해 주세요.'}
            onChange={handleChange}
            value={passwordVerification}
          />
        </div>
      </div>
      <Button text={'회원가입'} type="signup" onClick={handleSubmit} />
    </form>
  );
}

export default SignupForm;
