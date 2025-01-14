import Input, { InputProps } from '@/components/shared/input';
import withLabel from '@/components/shared/input/HOC/withLabel';
import Button from '@/components/shared/Button';

interface SignupFormProps {
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SignupForm(props: SignupFormProps) {
  const { handleSubmit, handleChange } = props;
  const InputWithLabel = withLabel<InputProps>(Input);
  return (
    <form className="flex w-[324px] flex-col gap-[68px]">
      <div className="flex flex-col gap-6">
        <InputWithLabel
          id={'name'}
          placeholder={'이름을 입력해 주세요.'}
          name={'이름'}
          labelClassName="label"
          inputOnChange={handleChange}
        />
        <InputWithLabel
          id={'company'}
          placeholder={'회사명을 입력해 주세요.'}
          name={'회사명'}
          labelClassName="label"
        />
        <InputWithLabel
          id={'email'}
          placeholder={'이메일 주소를 입력해 주세요.'}
          name={'이메일 주소'}
          labelClassName="label"
          inputOnChange={handleChange}
        />
        <div className="flex flex-col gap-6">
          <InputWithLabel
            id={'password'}
            placeholder={'비밀번호를 입력해 주세요.'}
            name={'비밀번호'}
            labelClassName="label"
            inputOnChange={handleChange}
          />
          <Input
            id={'passwordVerification'}
            aria-label={'passwordVerification'}
            placeholder={'비밀번호를 다시 입력해 주세요.'}
            onChange={handleChange}
          />
        </div>
      </div>
      <Button text={'회원가입'} type="signup" onClick={handleSubmit} />
    </form>
  );
}

export default SignupForm;
