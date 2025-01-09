import Input from '@/components/shared/input';

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-[300px] flex-col gap-4">
        <Input placeholder="이름을 입력해 주세요." />
        <Input placeholder="회사명을 입력해 주세요." />
        <Input placeholder="이메일 주소를 입력해 주세요" />
        <Input placeholder="비밀번호를 입력해 주세요." />
        <Input placeholder="비밀번호를 다시 한번 입력해 주세요." />
        <Input placeholder="아이디를 입력해주세요." />
        <Input placeholder="모임을 검색해 보세요!" />
        <Input placeholder="모임 이름을 작성해 주세요." />
        <Input placeholder="모집 인원은..." />
      </div>
    </div>
  );
}
