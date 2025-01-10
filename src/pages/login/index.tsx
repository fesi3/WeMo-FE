import Input from '@/components/shared/input';
import InputWithLabel from '@/components/shared/input/HOC/inputWithLabel';

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center bg-zinc-500">
      <div className="flex w-[300px] flex-col gap-4">
        <InputWithLabel
          id="company"
          name="회사명"
          placeholder="회사명을 입력해 주세요."
        />
        <InputWithLabel
          id="email"
          name="이메일"
          placeholder="이메일을 입력해 주세요."
        />
        <InputWithLabel
          id="passwod"
          name="비밀번호"
          placeholder="비밀번호를 주세요."
        />
        <InputWithLabel
          id="password-check"
          name="비밀번호 확인"
          placeholder="비밀번호를 다시 한번 입력해 주세요."
        />
        <InputWithLabel
          id="id"
          name="아이디"
          placeholder="아이디를 입력해 주세요."
        />
        <InputWithLabel
          id="groupName"
          name="모임이름"
          placeholder="모임 이름을 작성해 주세요."
        />
        <InputWithLabel
          id="people"
          name="모집정원"
          placeholder="모집 정원을 입력해 주세요."
        />
        <Input
          aria-label=""
          id="search"
          placeholder="모임을 검색해 보세요!"
          className="bg-pink-200"
        />
      </div>
    </div>
  );
}
