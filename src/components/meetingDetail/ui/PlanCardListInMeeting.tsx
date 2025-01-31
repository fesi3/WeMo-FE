import DateBadge from '@/components/shared/DateBadge';
import ProgressBar from '@/components/shared/ProgressBar';
import { PlanInMeeting } from '@/types/api/meeting';
import { UserIcon } from '@heroicons/react/20/solid';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface PlanCardListInMeetingProps {
  planList: PlanInMeeting[];
}
export default function PlanCardListInMeeting({
  planList,
}: PlanCardListInMeetingProps) {
  const router = useRouter();
  return (
    <div className="flex gap-3">
      {planList.slice(0, 2).map((plan) => (
        <button
          onClick={() => {
            router.push(`/plans/${plan.planId}`);
          }}
          key={plan.planId}
          className="flex w-1/2 flex-col gap-2 rounded-md border border-black-sub border-opacity-30 p-2"
        >
          <div className="relative aspect-[5/3] w-full">
            <Image
              sizes="30vw"
              src={plan.planImagePath[0]}
              priority
              fill
              alt="일정 대표 사진"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold">{plan.planName}</span>
            <div className="flex gap-2">
              <DateBadge className="text-xs">
                {dayjs(plan.dateTime).format('MM월 DD일')}
              </DateBadge>
              <DateBadge className="text-xs">
                {dayjs(plan.dateTime).format('HH시 MM분')}
              </DateBadge>
            </div>
            <div className="flex items-center gap-2">
              <UserIcon opacity="0.6" width={25} height={25} />
              <ProgressBar
                capacity={plan.capacity}
                participants={plan.participants}
              />
              <span className="text-sm text-black-sub">{`${plan.participants}/${plan.capacity}`}</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
