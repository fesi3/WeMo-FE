import Button from '@/components/shared/Button';
import Input from '@/components/shared/input';
import withLabel from '@/components/shared/input/HOC/withLabel';

interface LoginFormProps {
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function LoginForm(props: LoginFormProps) {
  const { handleSubmit } = props;
  const InputWithLabel = withLabel(Input);
  return (
    <form className="flex w-[320px] flex-col gap-6 p-[10px]">
      <div className="flex w-[320px] flex-col gap-2">
        <InputWithLabel
          id="email"
          placeholder="이메일을 입력해주세요."
          name="이메일"
          labelClassName="label"
        />
        <InputWithLabel
          id="password"
          placeholder="비밀번호를 입력해주세요."
          name="비밀번호"
          labelClassName="label"
        />
      </div>
      <Button text={'로그인'} type="signup" onClick={handleSubmit} />
    </form>
  );
}

export default LoginForm;
