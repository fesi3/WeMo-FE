import Image from 'next/image';
import { PlanData } from '@/pages/user/[username]/plan';
import ProgressIndicator from './Indicator';
import { planCardDay, planCardTime } from '@/utils/dateUtils';
import moreBtn from '@/assets/icons/more-vertical.png';
import Button from '../shared/Button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
interface PlanCardProps {
  planData: PlanData; // planData의 타입을 PlanData로 변경
  useremail: string; // 이메일(전역 정보)로 수정하기
}
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// const BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

const PlanCard = ({ planData, useremail }: PlanCardProps) => {
  const {
    planId,
    email,
    planName,
    category,
    province,
    district,
    planImagePath,
    dateTime,
    // meetingId,
    // meetingName,
    // capacity,
    participants,
    // registrationEnd,
    // isOpened,
    // isCancled,
    // isFulled,
    // isLiked,
  } = planData;

  const router = useRouter();

  const handleLeaveMeeting = async (planId: number) => {
    // 탈퇴 로직 추가/api/plans/{planId}/attendance
    console.log(`${planId}번 모임을 탈퇴합니다.`);
    try {
      console.log(`${planId}번 모임을 삭제합니다.`);

      // 삭제 API 요청
      const response = await axios.delete(
        `${BASE_URL}/api/plans/${planId}/attendance`,
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        alert(`${planName} 일정을 취소했습니다.`);
        // 삭제 후 모임 리스트에서 해당 모임을 제거
        window.location.reload(); // 페이지 새로 고침
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.log('서버로부터 받은 에러 데이터', error.response.data);
        if (error.response.status === 400) {
          alert('로그인이 필요합니다!.');
          router.push('/login');
          return;
        } else {
          alert('[error] 서버와 통신 오류 발생.');
        }
      } else {
        //axios 에러가 아닌 다른 예외가 발생한 경우
        alert('[error] 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleDeleteMeeting = async (planId: number) => {
    // 삭제 로직 추가 /api/plans/{planId}/cancel
    console.log(`${planId}번 일정을 삭제합니다.`);
  };

  // 동일한 이메일이면 "삭제" 버튼, 다르면 "탈퇴" 버튼
  const renderButton = () => {
    if (useremail === email) {
      return (
        <Button
          type="exit_meeting"
          text="일정 삭제"
          textColor="black"
          border="#343434"
          onClick={() => handleDeleteMeeting(planId)}
        />
      );
    } else {
      return (
        <Button
          type="exit_meeting"
          text="일정 취소하기"
          textColor="black"
          border="#343434"
          onClick={() => handleLeaveMeeting(planId)}
        />
      );
    }
  };

  const currentStatus = participants < 5 ? 'pending' : 'available';
  return (
    <div className="mb-4 flex flex-col rounded-md border border-gray-200 sm:flex-row sm:items-center sm:gap-3 md:gap-5">
      {/* 이미지 */}
      <div
        onClick={() => {
          router.push(`/meetings/1`);
        }}
        className="relative h-[164px] w-full cursor-pointer sm:w-[200px] md:w-[300px] lg:w-[400px]"
      >
        <Image
          src={planImagePath}
          alt="모임 이미지"
          fill
          className="rounded-t-md object-cover"
        />

        {/* 삭제 */}
        <button className="absolute right-3 top-3 cursor-pointer">
          <Image src={moreBtn} alt="My Image" className="z-10" />
        </button>
      </div>

      {/* 카드 내용 */}
      <div className="flex-1 p-3">
        {/* 진행 상태 인디케이터 */}
        <div>
          {' '}
          <ProgressIndicator currentStatus={currentStatus} />
        </div>

        {/* 구분선 */}
        <div className="my-4 border-b border-gray-200"></div>

        {/* 날짜, 시간, 위치 */}
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="rounded-full bg-gray-100 px-3 py-1 font-medium">
            {planCardDay(dateTime)}
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1 font-medium">
            {planCardTime(dateTime)}
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1 font-medium">
            {province} {district}
          </span>
        </div>

        <div className="flex">
          <div className="flex flex-1 flex-col gap-1 p-2">
            {/* 제목 */}
            <div
              onClick={() => {
                router.push(`/meetings/1`);
              }}
              className="cursor-pointer text-lg font-semibold"
            >
              {planName}
            </div>

            {/* 카테고리 */}
            <div className="text-sm">{category}</div>
          </div>
          <div className="self-end">{renderButton()}</div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
