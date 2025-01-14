interface ButtonProps {
  type?: string;
  text?: string;
  textColor?: string;
  backColor?: string;
  border?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; // 버튼 클릭 시 실행할 함수
  isActive?: boolean; // 버튼 or 탭 클릭 시 "UI 스타일만" 변경(배경 or text)
  disable?: boolean; // 버튼 비활성화 버튼(비활성화+UI스타일 변경 - form 에 사용)
}

/* ============ 사용 예시 ============ */
// type은 switch 문에 주석 달아놨으니 보고 사용하시면 됩니다
// 똑같은 크기의 다른 역할(ex. 모달에서 취소/제출 버튼)은 textColor, backColor, border 지정해주셔야 합니다.
// 버튼의 종류가 다양해서 놓친 게 있을 수 있으니 DM으로 말씀해주세여 :)
{
  /* <Button
        type="start"
        text="비회원으로 시작하기"
        textColor="#ffffff"
        backColor="#000000"
        border="1px solid #000000"
      />
   */
}
const Button = ({
  type,
  text,
  textColor,
  backColor,
  border,
  onClick,
  isActive,
  disable = false,
}: ButtonProps) => {
  // 크기에 따라 Tailwind 클래스 설정
  // 기본: 모바일, sm: 태블릿, md: PC
  let sizeClass = '';
  let activeClass = '';

  const baseClass =
    'rounded-[8px] text-center text-nowrap  '; /* border border-blue-950*/

  switch (type) {
    // 로그인, 회원가입, 비회원으로 시작하기
    case 'start':
      sizeClass =
        'w-[300px] h-[42px] mb-4 text-base font-semibold rounded-lg border border-gray-400';
      break;
    case 'start-signup':
      sizeClass =
        'w-[300px] h-[42px] mb-4 text-base font-semibold rounded-lg border bg-primary-10 text-primary-100';
      break;
    // 회원 가입 버튼, 회사명 입력 버튼
    case 'signup':
    case 'companyName':
      sizeClass =
        'w-[324px] h-[42px] mb-6 text-base font-semibold rounded-lg bg-primary-10 text-primary-100';
      break;

    case 'meeting_create': // 모임 만들기(메인페이지)
      sizeClass =
        'w-[336px] h-[42px] text-base font-medium bg-[#000000] text-primary-100';
      break;
    case 'no_meeting': // 모임 보러가기(찜한 목록에서 모임 없을 때)
      sizeClass =
        'w-[160px] h-[42px] text-base font-medium bg-[#000000] text-primary-100';
      break;

    // 모임 참석/참석 취소 버튼(모임 상세)
    case 'attend': // 참석하기 버튼
    case 'attendCancle': // 참석 취소하기 버튼
      sizeClass = 'w-[296px] h-[42px] text-base font-medium ';
      break;

    case 'meetingImg': // 모임 이미지 선택(모임 모달)
      sizeClass =
        'w-[318px] h-[36px] text-sm font-medium bg-[rgba(0,0,0,0.5)] text-primary-100';
      break;
    case 'meetingD': // 달램핏(모임 모달)
      sizeClass =
        'w-[55px] h-[36px] text-sm font-normal bg-gray-200 rounded-[6px]';
      activeClass = isActive ? 'bg-green-100 font-semibold' : '';
      break;
    case 'meetingW': // 워케이션(모임 모달)
      sizeClass =
        'w-[68px] h-[36px] text-sm font-normal bg-gray-200 rounded-[6px]';
      activeClass = isActive ? 'bg-green-100 font-semibold' : '';
      break;
    case 'meetingSubmit': // 제출하기(모임 모달)
      sizeClass =
        'w-[318px] h-[42px] text-base font-semibold bg-[#000000] text-primary-100';
      break;
    case 'meeting_modify_submit': // 모임 수정 제출하기(모임 모달)
      sizeClass = 'w-[151px] h-[36px] text-base font-semibold';
      break;

    case 'review_create': // 리뷰 작성하기(모임 컴포넌트 내)
      sizeClass =
        'w-[125px] h-[36px] text-base font-medium bg-[#000000] text-primary-100';
      break;
    case 'reviewSubmit': // 리뷰 작성 제출하기(리뷰 모달)
      sizeClass = 'w-[139.5px] h-[42px] text-base font-semibold rounded-[12px]';
      break;

    case 'tabLeft': // 탭(왼쪽)
      sizeClass = 'w-[169px] h-[42px] text-base font-medium rounded-e-none ';
      activeClass = isActive
        ? 'bg-[#000000] text-primary-100 font-semibold'
        : 'border border-black';
      break;
    case 'tabRight': // 탭(오른쪽)
      sizeClass = 'w-[169px] h-[42px] text-base font-medium rounded-s-none';
      activeClass = isActive
        ? 'bg-[#000000] text-primary-100 font-semibold'
        : 'border border-black';
      break;

    case 'profile_modify': // 프로필 수정하기 버튼(프로필 수정 모달)
      sizeClass = 'w-[131.5px] h-[42px] text-base font-medium';
      break;
    default: // 아무 타입 지정하지 않았을 때
      sizeClass = 'text-[14px] w-[120px] h-[40px] bg-orange-200 ';
      break;
  }

  const className = `${baseClass} ${sizeClass} ${activeClass} ${backColor || ''} ${textColor || ''}
   ${border || ''} ${disable ? 'opacity-50 cursor-not-allowed' : ''}`;

  return (
    <button
      className={className} /*  px-[12px] py-[10px]  */
      disabled={disable}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
