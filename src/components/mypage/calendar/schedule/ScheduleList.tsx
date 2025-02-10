import Button from '@/components/shared/Button';
import { CalendarPlanData } from '@/types/mypageType';
import React from 'react';

interface ScheduleListProps {
  renderPlanListData: CalendarPlanData;
}

const ScheduleList = ({ renderPlanListData }: ScheduleListProps) => {
  const {
    // planId,
    planName,
    // dateTime,
    // isOpen,
    isCompelete,
    category,
    // planImagePath,
    addressDetail,
  } = renderPlanListData;

  return (
    <ul className="mt-2 flex space-y-2">
      <li
        className={`flex flex-1 items-center justify-between rounded-lg border p-3 ${isCompelete ? 'bg-gray-100' : 'bg-white'}`}
      >
        <div className="flex items-center gap-3">
          {/* 일정 아이콘 (원형) */}
          <div className="h-10 w-10 rounded-full bg-gray-200"></div>

          {/* 일정 정보 */}
          <div>
            <div className="flex gap-2">
              <p className="text-sm font-medium text-gray-900">{planName}</p>
              <p className="rounded-full bg-primary-10 px-2 py-1 text-xs font-medium text-white">
                {category}
              </p>
            </div>

            <p className="text-xs text-gray-500">{'07:00'}</p>
          </div>
        </div>

        {/* 상태 & 위치 정보 */}
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-700">{addressDetail}</p>
        </div>
      </li>
      {isCompelete && (
        <Button text={'리뷰 작성'} size={'small'} variant={'outline'} />
      )}
    </ul>
  );
};

export default ScheduleList;
