import Input from '@/components/shared/input';
import withLabel from '@/components/shared/input/HOC/withLabel';
import Button from '@/components/shared/Button';

export default function Signup() {
  const InputWithLabel = withLabel(Input);
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('폼 제출 완료!');
  };
  return (
    <form action="" className="flex flex-col gap-[68px]">
      <div className="flex w-[324px] flex-col gap-6">
        <InputWithLabel
          id={'name'}
          placeholder={'이름을 입력해 주세요.'}
          name={'이름'}
          className=""
          labelClassName="label"
        />
        <InputWithLabel
          id={'company-name'}
          placeholder={'회사명을 입력해 주세요.'}
          name={'회사명'}
          labelClassName="label"
        />
        <InputWithLabel
          id={'email'}
          placeholder={'이메일 주소를 입력해 주세요.'}
          name={'이메일 주소'}
          labelClassName="label"
        />
        <div className="flex flex-col gap-6">
          <InputWithLabel
            id={'password'}
            placeholder={'비밀번호를 입력해 주세요.'}
            name={'비밀번호'}
            labelClassName="label"
          />
          <Input
            id={'password-verifing'}
            aria-label={'password-verifing'}
            placeholder={'비밀번호를 다시 입력해 주세요.'}
          />
        </div>
      </div>
      <Button text={'회원가입'} type="signup" onClick={handleSubmit} />
      <p className="font-sans">English: Hello, this is Roboto font!</p>
      <p className="font-sans">
        한국어: 안녕하세요, 이것은 Noto Sans 글꼴입니다!
      </p>
    </form>
  );
}
