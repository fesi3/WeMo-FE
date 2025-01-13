import Input from '@/components/shared/input';
import withLabel from '@/components/shared/input/HoC/withLabel';
import Button from '@/components/shared/Button';

export default function Signup() {
  const InputWithLabel = withLabel(Input);
  return (
    <form action="">
      <InputWithLabel
        id={'name'}
        placeholder={'이름을 입력해 주세요.'}
        name={'이름'}
      />
      <InputWithLabel
        id={'company-name'}
        placeholder={'회사명을 입력해 주세요.'}
        name={'회사명'}
      />
      <InputWithLabel
        id={'email'}
        placeholder={'이메일 주소를 입력해 주세요.'}
        name={'이메일 주소'}
      />
      <InputWithLabel
        id={'password'}
        placeholder={'비밀번호를 입력해 주세요.'}
        name={'이메일 주소'}
      />
      <Input
        id={'password-verifing'}
        aria-label={'password-verifing'}
        placeholder={'비밀번호를 다시 입력해 주세요.'}
      />
      <Button text={'회원가입'} type="signup" />
    </form>
  );
}
