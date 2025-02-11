import { CalendarPlanData } from '@/types/mypageType';
import React from 'react';
import Image from 'next/image';
import { planCardTime } from '@/utils/dateUtils';
import Link from 'next/link';

interface ScheduleListProps {
  renderPlanListData: CalendarPlanData;
}

const ScheduleList = ({ renderPlanListData }: ScheduleListProps) => {
  const {
    planId,
    planName,
    dateTime,
    // isOpened,
    isCompleted,
    category,
    planImagePath,
    addressDetail,
  } = renderPlanListData;

  const time = planCardTime(dateTime);
  return (
    <ul className="mt-2">
      <Link href={`/plans/${planId}`}>
        <li
          className={`flex flex-1 items-center justify-between rounded-lg border p-3 ${isCompleted ? 'bg-gray-200 opacity-70' : 'bg-white'}`}
        >
          <div className="flex items-center gap-3">
            {/* x월 xx일 일정 */}
            <div className="relative h-[40px] w-[40px] rounded-full bg-red-50">
              <Image
                src={planImagePath}
                alt={'일정'}
                fill
                className="rounded-full object-cover"
                sizes="(max-width: 640px) 40px, (max-width: 768px) 40px, 40px"
              />
            </div>
            {/* 일정 정보(카테고리+일정 이름) */}
            <div>
              <p className="mb-1 rounded-lg text-xs font-medium text-primary-10">
                {category}
              </p>
              <p className="w-[130px] text-base font-medium text-gray-900 md:text-nowrap">
                {planName}
              </p>
            </div>
          </div>

          {/* 시간 & 위치 정보 */}
          <div className="flex flex-col items-end gap-2">
            <p className="text-sm text-gray-700">{addressDetail}</p>
            <p className="text-xs text-gray-500">{time}</p>
          </div>
        </li>
      </Link>

      {/* {isCompleted && (
        <Button text={'리뷰 작성'} size={'small'} variant={'outline'} />
      )} */}
    </ul>
  );
};

export default ScheduleList;
