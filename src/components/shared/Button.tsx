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
        textColor="#ffffff" or 'text-primary-0'
        backColor="#000000" or 'bg-primary-0'
        border=" #000000"  // border는 1px solid가 default 입니다! 다른 border 사용 시 DM 주세요!
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

  /*text-base(16px디폴트) / 텍스트 흰색 기본*/
  const baseClass =
    ' text-center text-nowrap font-medium text-base text-primary-100 ';

  const style = {
    color: textColor,
    backgroundColor: backColor,
    border: `1px solid ${border}`,
  };

  switch (type) {
    // 비회원으로 시작하기
    case 'start':
      sizeClass =
        'w-[300px] h-[42px] border border-black bg-primary-100 text-primary-0 rounded-[8px]';
      break;
    // 회원가입/로그인으로 시작하기
    case 'start_signup':
    case 'start_login':
      sizeClass =
        'w-[300px] h-[42px] font-semibold bg-primary-10 rounded-[8px]';
      break;
    // 회원 가입 버튼, 회사명 입력 버튼
    case 'signup':
    case 'companyName':
      sizeClass =
        'w-[324px] h-[42px] font-semibold bg-primary-10 rounded-[8px]';
      break;
    case 'meeting_create': // 모임 만들기(메인페이지)
      sizeClass = 'w-[336px] h-[42px] bg-primary-10 rounded-[8px]';
      break;
    case 'no_meeting': // 모임 보러가기(찜한 목록에서 모임 없을 때)
      sizeClass = 'w-[160px] h-[42px] bg-primary-10 rounded-[8px]';
      break;

    // 모임 참석/참석 취소 버튼(모임 상세)
    case 'attend': // 참석하기 버튼
    case 'attendCancle': // 참석 취소하기 버튼
      sizeClass =
        'w-[296px] h-[42px] font-semibold bg-primary-10 rounded-[8px]';
      break;

    case 'meetingImg': // 모임 이미지 선택(모임 모달)
      sizeClass =
        'w-[318px] h-[36px] text-sm bg-[rgba(0,0,0,0.5)] border rounded-[6px]';
      break;
    case 'meetingD': // 달램핏(모임 모달)
      sizeClass =
        'w-[55px] h-[36px] text-sm font-normal bg-gray-200 rounded-[6px] text-primary-0';
      activeClass = isActive ? 'bg-primary-70 font-semibold' : '';
      break;
    case 'meetingW': // 워케이션(모임 모달)
      sizeClass =
        'w-[68px] h-[36px] text-sm font-normal bg-gray-200 rounded-[6px] text-primary-0';
      activeClass = isActive ? 'bg-primary-70 font-semibold' : '';
      break;

    case 'meeting_modify_submit': // 모임 제출하기(모임 모달) - 취소/수정
      sizeClass =
        'w-[151px] h-[36px] font-semibold bg-primary-10 rounded-[12px] ';
      break;

    case 'review_create': // 리뷰 작성하기(모임 컴포넌트 내)
      sizeClass = 'w-[125px] h-[36px] bg-primary-10 rounded-[8px]';
      break;
    case 'reviewSubmit': // 리뷰 작성 제출하기(리뷰 모달) - 취소/등록
      sizeClass =
        'w-[139.5px] h-[42px] font-semibold bg-primary-10 rounded-[12px] ';
      break;

    case 'tabLeft': // 탭(왼쪽)
      sizeClass = 'w-[169px] h-[42px] rounded-e-none rounded-s-[8px] ';
      activeClass = isActive
        ? 'bg-primary-10 font-semibold'
        : 'bg-[#EAEAEA] text-[#000000]';
      break;
    case 'tabRight': // 탭(오른쪽)
      sizeClass = 'w-[169px] h-[42px] rounded-s-none rounded-e-[8px] ';
      activeClass = isActive
        ? 'bg-primary-10 font-semibold'
        : 'bg-[#EAEAEA] text-[#000000]';
      break;

    case 'profile_modify': // 프로필 수정하기 버튼(프로필 수정 모달) -수정하기/취소
      sizeClass = 'w-[131.5px] h-[42px] bg-primary-10 rounded-[8px] ';
      break;

    //========= 추가된 스타일 ==============/
    case 'modify_mypage': // 마이페이지에서 수정/삭제버튼
      sizeClass =
        'w-[54px] h-[32px] text-sm font-medium border border-[#A4A4A4] rounded-[12px] ';
      break;
    case 'exit_meeting': // 마이페이지에서 모임 탈퇴
      sizeClass =
        'w-[90px] h-[32px] text-sm font-medium border border-[#A4A4A4] rounded-[12px] ';
      break;

    case 'main_tab_total': // 메인 전체 탭
    case 'main_tab_office': // 메인 오피스 탭
      sizeClass =
        'w-[80px] h-[30px] text-sm font-bold bg-primary-40 rounded-full shadow-lg';
      break;

    case 'main_tab_mind': // 메인 마인드 풀 탭
      sizeClass =
        'w-[121px] h-[30px] text-sm font-bold bg-primary-40 rounded-full shadow-lg';
      break;

    case 'plan_detail': // 일정 상세정보-일정 변경하기
      sizeClass = 'w-[318px] h-[42px] bg-primary-10 rounded-full shadow-lg';
      break;

    case 'plan_modal': // 일정 모달 버튼
      sizeClass =
        'w-[318px] h-[42px] font-semibold bg-primary-10 rounded-[8px] ';
      break;

    default: // 아무 타입 지정하지 않았을 때
      sizeClass = 'text-[14px] w-[120px] h-[40px] bg-orange-200 ';
      break;
  }

  // 활성화 여부에 따라 배경색 변경 (메인 페이지 버튼에만 적용)
  if (
    type === 'main_tab_total' ||
    type === 'main_tab_office' ||
    type === 'main_tab_mind'
  ) {
    activeClass = isActive
      ? 'bg-primary-40 text-white' // 활성화 상태
      : 'bg-primary-70 text-primary-100'; // 비활성화 상태
  }

  const className = `${baseClass} ${sizeClass} ${activeClass} ${backColor || ''} ${textColor || ''}
   ${border || ''} ${disable ? 'opacity-50 cursor-not-allowed' : ''}`;

  return (
    <button
      className={className} /*  px-[12px] py-[10px]  */
      disabled={disable}
      onClick={onClick}
      style={style} // border, textCol, borderCol 스타일 임의 변경 가능하도록
    >
      {text}
    </button>
  );
};

export default Button;
