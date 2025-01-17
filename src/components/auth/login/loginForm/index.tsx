import Button from '@/components/shared/Button';

interface LoginFormProps {
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function LoginForm(props: LoginFormProps) {
  const { handleSubmit } = props;
  return (
    <form className="flex w-[320px] flex-col gap-6 p-[10px]">
      <div className="flex w-[320px] flex-col gap-2"></div>
      <Button text={'로그인'} type="signup" onClick={handleSubmit} />
    </form>
  );
}

export default LoginForm;
