import Image from 'next/image';
import ProgressIndicator from './Indicator';
import { planCardDay, planCardTime } from '@/utils/dateUtils';
import moreBtn from '@/assets/icons/more-vertical.png';
import { useRouter } from 'next/router';
import OwnerButton from './OwnerButton';
import { PlanData } from '@/types/mypageType';
import { useCancle } from '@/hooks/useCancle';
import Button from '@/components/shared/Button';

interface PlanCardProps {
  planData: PlanData;
}

const PlanCard = ({ planData }: PlanCardProps) => {
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
    isFulled,
    // isLiked,
  } = planData;

  const router = useRouter();

  const handleLeavePlan = (planId: number) => {
    // 탈퇴 로직 추가/api/plans/{planId}/attendance
    console.log(`${planId}번 일정을 탈퇴합니다.`);
    useCancle({
      url: `/api/plans/${planId}/attendance`,
      successMessage: '일정을 취소했습니다.',
      router,
    });
  };

  const handleDeletePlan = (planId: number) => {
    // 삭제 로직 추가 /api/plans/{planId}/cancel
    console.log(`${planId}번 일정을 삭제합니다.`);
    useCancle({
      url: `/api/plans/${planId}/cancel`,
      successMessage: '일정을 삭제했습니다.',
      router,
    });
  };

  // 페이지 이동
  const handleDetailPage = () => {
    router.push(`/plans/${planId}`);
  };

  const currentStatus = participants < 5 ? 'pending' : 'available';
  return (
    <div className="relative mb-4 flex flex-col rounded-md border border-gray-200 sm:flex-row sm:items-center sm:gap-3 md:gap-5">
      {/* 반투명 오버레이 */}
      {isFulled && ( // isCancled로 바꾸기
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="flex flex-col">
            <p className="mb-4 bg-primary-95 bg-opacity-70 p-3 font-semibold text-primary-10">
              주최자에 의해 취소된 일정입니다.
            </p>
            <Button text="삭제하기" onClick={() => handleLeavePlan(planId)} />
          </div>
        </div>
      )}
      {/* 이미지 */}
      <div
        onClick={handleDetailPage}
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
              onClick={handleDetailPage}
              className="cursor-pointer text-lg font-semibold"
            >
              {planName}
            </div>

            {/* 카테고리 */}
            <div className="text-sm">{category}</div>
          </div>
          <div className="self-end">
            {' '}
            <OwnerButton
              email={email}
              id={planId}
              onDelete={handleDeletePlan}
              onLeave={handleLeavePlan}
              type="plan"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
