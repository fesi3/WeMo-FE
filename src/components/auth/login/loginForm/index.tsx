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
  const { handleSubmit, handleChange } = props;
  return (
    <form className="flex w-[320px] flex-col gap-6 p-[10px]">
      <div className="flex w-[320px] flex-col gap-2">
        <InputWithMessage
          id="id"
          placeholder="이메일을 입력해주세요."
          onChange={handleChange}
          inputClassName="border"
        />
        <InputWithMessage
          id="password"
          placeholder="비밀번호를 입력해주세요."
          onChange={handleChange}
          inputClassName="border"
        />
      </div>
      <Button text={'로그인'} type="signup" onClick={handleSubmit} />
    </form>
  );
}

export default LoginForm;
