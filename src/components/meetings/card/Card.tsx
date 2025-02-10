import { useRouter } from 'next/router';
import { UserGroupIcon } from '@heroicons/react/20/solid';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import dayjs from 'dayjs';
import Image from 'next/image';
import CategoryBadge from '@/components/shared/badges/CategoryBadge';
import { Meeting } from '@/types/api/meetingList';

const MAX_DISPLAY_PLANS = 4;

const getPlanBadgeClass = (isFulled: boolean) => {
  return isFulled
    ? 'bg-gray-200 text-white line-through'
    : 'bg-white text-primary-10 border border-primary-10';
};

const Card = ({ meeting }: { meeting: Meeting }) => {
  const maxItems = MAX_DISPLAY_PLANS;
  const displayedPlans = meeting.planList.slice(0, maxItems);
  const router = useRouter();
  const handleClick = () => {
    router.push(`/meetings/${meeting.meetingId}`);
  };

  return (
    <div className="rounded-lg border bg-white p-4 shadow-md">
      {/* 모임 정보 */}
      <div className="flex items-center">
        <div className="flex-1">
          <CategoryBadge category={meeting.category} />
          <h2 className="mt-2 text-lg font-bold">{meeting.meetingName}</h2>
          <p className="text-md mt-1 text-gray-400">{meeting.description}</p>
          <div className="text-md mt-2 flex items-center space-x-1 whitespace-nowrap font-semibold text-gray-400">
            <UserGroupIcon className="h-4 w-4" />
            <p>멤버 수 {meeting.memberCount}</p>
            <p className="before:mx-1 before:content-['·']">
              예정 일정 {meeting.planCount}
            </p>
          </div>
        </div>
        {meeting.meetingImagePath && (
          <div className="relative ml-4 aspect-[5/3] h-auto w-40 overflow-hidden rounded-lg object-cover">
            <Image
              src={meeting.meetingImagePath}
              alt="Meeting"
              width={200}
              height={120}
              className="rounded-lg"
            />
          </div>
        )}
      </div>
      {/* 일정 정보 */}
      <div className="mt-2 cursor-pointer border-t pt-2" onClick={handleClick}>
        <div className="relative">
          <h3 className="mb-2 text-sm font-semibold">예정된 일정</h3>
          {meeting.planList.length > 0 ? (
            <ul className="flex flex-wrap gap-2 pr-16 text-sm text-gray-600">
              {displayedPlans.map((plan) => (
                <li key={plan.planId} className="inline-flex">
                  <span
                    className={`rounded px-3 py-1 text-xs ${getPlanBadgeClass(plan.isFulled)}`}
                  >
                    {dayjs(plan.dateTime).format('M/D HH:mm')}
                  </span>
                </li>
              ))}
              {meeting.planList.length >= maxItems && <li>...</li>}
            </ul>
          ) : (
            <p className="text-xs text-gray-400">
              아직 일정이 없어요. 무슨 모임인지 알아볼까요?
            </p>
          )}
          <span className="absolute right-0 top-0 flex items-center gap-x-1 text-sm text-gray-400">
            더보기
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
