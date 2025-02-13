import React, { lazy, Suspense, useCallback, useState } from 'react';
import {
  getDateInfo,
  getFilteredSchedulesByMonth,
  getFirstAndLastDayOfMonth,
} from '@/utils/dateUtils';

import { useMyPlanCalendar } from '@/hooks/mypage/fetch/useMypageData';
import MypageLayout from '@/components/mypage/MypageLayout';
import Button from '@/components/shared/Button';
import { useRouter } from 'next/router';

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

const MyPlanCalendar = lazy(
  () => import('@/components/mypage/calendar/MyPlanCalendar'),
);
const ScheduleTitle = lazy(
  () => import('@/components/mypage/calendar/schedule/ScheduleTitle'),
);
const ScheduleList = lazy(
  () => import('@/components/mypage/calendar/schedule/ScheduleList'),
);

export default function CalendarPage() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Value>(today); // 선택한 날짜 상태 (초기화: 오늘날짜)

  const handleDateChange = useCallback((newDate: Value) => {
    setSelectedDate(newDate);
  }, []);

  // 현재 날짜의 연,월,일
  const currentDate = getDateInfo();

  // 특정 월의 첫째 - 마지막 날 가져오기!
  const { startDate, endDate } = getFirstAndLastDayOfMonth(
    currentDate.year,
    currentDate.month,
  );

  const { data, isFetching, error } = useMyPlanCalendar(startDate, endDate);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return;

  const myCalendarPlanData = data?.data.planList;

  console.log('서버에서 온 데이터', myCalendarPlanData);

  //  일정 필터링 - 이달의 일정
  const filteredSchedulesInThisMonth = getFilteredSchedulesByMonth(
    myCalendarPlanData,
    `${currentDate.year}-${currentDate.month}`,
  );
  //이달의 일정 추출(하트 표시 위함)
  const heartsPlan = [
    ...new Set(
      filteredSchedulesInThisMonth.map(
        (schedule) => getDateInfo(schedule.dateTime).day,
      ),
    ),
  ];

  // 선택한 날짜 = 이달의 일정 배열에서의 날짜 -> 일정 리스트를 렌더링
  const renderPlanList = filteredSchedulesInThisMonth.filter((plan) => {
    const planDateInfo = getDateInfo(plan.dateTime); // 서버로부터 받은 일정의 날짜
    const selectedDateInfo = getDateInfo(selectedDate as Date); // 선택한 날짜
    return planDateInfo.day === selectedDateInfo.day;
  });

  const router = useRouter();

  const planViewClick = () => {
    router.prefetch('/plans');
    router.push('/plans');
  };

  return (
    <MypageLayout>
      <div className="flex w-full min-w-[335px] flex-col items-center gap-4 p-4 lg:flex-row lg:items-start lg:justify-center lg:gap-7">
        {/* 달력 부분 */}
        {!isFetching && (
          <section className="h-[360px] max-h-[540px] w-full max-w-[520px] place-items-center rounded-2xl bg-white p-5 shadow-md md:h-[540px] lg:h-[640px]">
            <Suspense
              fallback={<div className="h-full w-full">Loading 달력...</div>}
            >
              <MyPlanCalendar
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
                currentDate={currentDate}
                filteredSchedulesInThisMonth={renderPlanList}
                heartsPlan={heartsPlan}
              />
            </Suspense>
          </section>
        )}

        {/* 일정 리스트 부분 */}
        <section className="w-full max-w-[520px] rounded-2xl border bg-white px-5 pb-5 lg:h-[540px] lg:overflow-y-auto">
          <div>
            {/* sticky 요소 적용 */}
            <div className="sticky top-0 z-10 bg-white py-4">
              <ScheduleTitle
                selectedDate={selectedDate as Date}
                currentDate={currentDate}
              />
            </div>

            {!isFetching && renderPlanList && renderPlanList.length > 0 ? (
              renderPlanList.map((plan) => (
                <Suspense fallback={<div>Loading 일정...</div>}>
                  <ScheduleList key={plan.planId} renderPlanListData={plan} />
                </Suspense>
              ))
            ) : (
              <div className="ml-1 mt-4 flex justify-between text-sm text-gray-600">
                <span>{'앗! 일정이 없어요'}</span>

                <Button
                  text="일정 구경하러 가기"
                  size={'small'}
                  variant={'outline'}
                  className="p-1.5"
                  onClick={planViewClick}
                />
              </div>
            )}
          </div>
        </section>
      </div>
    </MypageLayout>
  );
}
