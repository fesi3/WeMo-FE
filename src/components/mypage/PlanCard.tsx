import Image from 'next/image';
import ProgressIndicator from './Indicator';
import { useRouter } from 'next/router';
import OwnerButton from './OwnerButton';
import { PlanData } from '@/types/mypageType';
import Button from '@/components/shared/Button';
import MeetingDate from '../shared/badges/MeetingDate';
import MeetingTime from '../shared/badges/MeetingTime';
import DistrictBadge from '../shared/badges/DistrictBadge';
import { useLeavePlanMutation } from '@/hooks/mypage/mutation/useLeaveMutation';
import { useDeletePlanMutation } from '@/hooks/mypage/mutation/useDeleteMutation';
import { useEffect } from 'react';

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
    participants,
    // isOpened,
    isCancled,
  } = planData;

  const router = useRouter();

  useEffect(() => {
    router.prefetch(`/plans/${planId}`);
  }, [planId, router]);

  const leavePlanMutation = useLeavePlanMutation();
  const deletePlanMutation = useDeletePlanMutation();

  //일정 취소(내가 참여한 일정)
  const handleLeavePlan = (planId: number) => {
    console.log(`${planId}번 일정을 탈퇴합니다.`);
    const isConfirmed = window.confirm('일정을 취소하시겠습니까?');
    if (isConfirmed) {
      leavePlanMutation.mutate(planId);
    }
  };

  //일정 삭제(내가 만든 일정)
  const handleDeletePlan = (planId: number) => {
    console.log(`${planId}번 일정을 삭제합니다.`);
    const isConfirmed = window.confirm('일정을 취소하시겠습니까?');
    if (isConfirmed) {
      deletePlanMutation.mutate(planId);
    }
  };

  // 페이지 이동
  const handleDetailPage = () => {
    router.push(`/plans/${planId}`);
  };

  const currentStatus = participants < 3 ? 'pending' : 'available';

  return (
    <div className="relative mb-4 flex min-w-[320px] max-w-[800px] flex-col rounded-2xl border border-gray-200 bg-white shadow-lg sm:flex-row sm:items-center sm:gap-3 sm:shadow-xl md:gap-0">
      {/* 반투명 오버레이 */}
      {isCancled && (
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
        className="relative h-[164px] w-full cursor-pointer sm:h-[196px] sm:w-[200px] md:w-[310px]"
      >
        <Image
          src={planImagePath}
          alt="모임 이미지"
          fill
          className="rounded-t-md object-cover p-0 md:rounded-l-2xl md:rounded-tr-none md:object-fill"
        />

        {/* 삭제 */}
        {/* <button className="absolute right-3 top-3 cursor-pointer  hover:bg-gray-300">
          <Image src={moreBtn} alt="My Image" className="z-10" />
        </button> */}
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
        <div className="ml-2 flex items-center gap-2 text-sm font-medium">
          <MeetingDate dateTime={dateTime} />
          <MeetingTime dateTime={dateTime} />
          <DistrictBadge district={`${province} ${district}`} />
        </div>

        <div className="flex">
          <div className="flex flex-1 flex-col gap-1 p-2 md:mt-3">
            {/* 제목 */}
            <div
              onClick={handleDetailPage}
              className="cursor-pointer text-lg font-semibold hover:underline"
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
