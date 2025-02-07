import { useRouter } from 'next/router';
import { UserGroupIcon } from '@heroicons/react/20/solid';
import dayjs from 'dayjs';
import Image from 'next/image';
import CategoryBadge from '@/components/shared/badges/CategoryBadge';

type Plan = {
  planId: number;
  planName: string;
  dateTime: string;
  isFulled: boolean;
};

type Meeting = {
  meetingId: number;
  meetingName: string;
  description: string;
  memberCount: number;
  meetingImagePath: string;
  category: string;
  planList: Plan[];
};

const MAX_DISPLAY_PLANS = 3;

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
          <h2 className="text-lg font-bold">{meeting.meetingName}</h2>
          <CategoryBadge className="my-2" category={meeting.category} />
          <p className="text-md text-gray-600">{meeting.description}</p>
          <div className="text-md mt-2 inline-flex items-center gap-x-1 text-gray-500">
            <UserGroupIcon className="h-4 w-4" />
            <p>멤버 수 {meeting.memberCount}</p>
            <p className="before:mx-1 before:content-['·']">예정 모임 n</p>{' '}
            {/* {meeting.planCount} */}
          </div>
        </div>
        {meeting.meetingImagePath && (
          <div className="relative ml-4 h-24 w-40">
            <Image
              src={meeting.meetingImagePath}
              alt="Meeting"
              width={200}
              height={120}
              objectFit="cover"
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
                    className={`rounded px-2 py-1 ${
                      plan.isFulled
                        ? 'bg-gray-100 text-gray-400 line-through'
                        : ''
                      // 마감 안된 일정 뱃지 -> 디자인 나오면 추후 수정
                    }`}
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
          <span className="absolute right-0 top-0 text-sm font-semibold text-blue-500">
            더보기 →
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
export type { Meeting };
