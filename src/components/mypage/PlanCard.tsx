import Image from 'next/image';
import { PlanData } from '@/pages/user/[username]/plan';
import ProgressIndicator from './Indicator';
import { planCardDay, planCardTime } from '@/utils/dateUtils';
interface PlanCardProps {
  planData: PlanData; // planData의 타입을 PlanData로 변경
}

const PlanCard = ({ planData }: PlanCardProps) => {
  const {
    // planId,
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

  const currentStatus = participants < 5 ? 'pending' : 'available';
  return (
    <div className="mb-4 flex flex-col rounded-md border border-gray-200 sm:flex-row sm:items-center sm:gap-3 md:gap-5">
      {/* 이미지 */}
      <div className="relative h-[164px] w-full sm:w-[200px] md:w-[300px] lg:w-[400px]">
        <Image
          src={planImagePath}
          alt="모임 이미지"
          fill
          className="rounded-t-md object-cover"
        />

        {/* 하트 아이콘 추가 */}
        <div className="absolute bottom-3 right-3 cursor-pointer">♥️</div>
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

        <div className="flex flex-col gap-1 p-2">
          {/* 제목 */}
          <div className="text-lg font-semibold">{planName}</div>

          {/* 카테고리 */}
          <div className="text-sm">{category}</div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
