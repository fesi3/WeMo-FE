import Button from '@/components/shared/Button';
import Input from '@/components/shared/input';
import withError from '@/components/shared/input/HOC/withError';
import { LoginFormTypes } from '../../type';

interface LoginFormProps {
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loginFormValue: LoginFormTypes;
  errors: { [key: string]: string };
}

const InputWithMessage = withError(Input);

function LoginForm(props: LoginFormProps) {
  const { handleSubmit, handleChange, errors } = props;
  const { email: emailError, password: passwordError } = errors;
  return (
    <form className="flex flex-col gap-6 p-[10px]">
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
        onClick={handleSubmit}
        width={320}
        height={42}
        disabled={errors['email'] || errors['password'] ? true : false}
      />
    </form>
  );
}

export default LoginForm;
