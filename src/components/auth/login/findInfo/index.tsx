import Link from 'next/link';

function FindInfo() {
  return (
    <div className="mt-5 flex items-center gap-3">
      <span
        onClick={() => alert('기능 구현 예정 입니다.')}
        className="text-sm text-gray-400"
      >
        {'아이디 찾기'}
      </span>
      <div className="h-3 border-l-2" />
      <span
        onClick={() => alert('기능 구현 예정 입니다.')}
        className="text-sm text-gray-400"
      >
        {'비밀번호 찾기'}
      </span>
      <div className="h-3 border-l-2" />
      <Link href={'/signup'}>
        <span className="text-sm text-gray-400">{'회원가입'}</span>
      </Link>
    </div>
  );
}

export default FindInfo;
