import React, { useCallback, useState } from 'react';
import {
  getDateInfo,
  getFilteredSchedulesByMonth,
  getFirstAndLastDayOfMonth,
} from '@/utils/dateUtils';
import ScheduleTitle from '@/components/mypage/calendar/schedule/ScheduleTitle';
import ScheduleList from '@/components/mypage/calendar/schedule/ScheduleList';
import MyPlanCalendar from '@/components/mypage/calendar/MyPlanCalendar';
import { useMyPlanCalendar } from '@/hooks/mypage/fetch/useMypageData';
import MypageLayout from '@/components/mypage/MypageLayout';

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

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

  const { data, isLoading, error } = useMyPlanCalendar(startDate, endDate);

  if (isLoading) return <div>달력 로딩 중...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>일정이 없습니다!</div>;

  const myCalendarPlanData = data?.data.planList;

  console.log('서버에서 온 데이터', myCalendarPlanData);

  // // 일정 필터링 - 이달의 일정
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

  return (
    <MypageLayout headerProps="이달의 일정">
      <div className="flex w-full flex-col items-center gap-4 p-4 lg:flex-row lg:items-start lg:justify-center lg:gap-7">
        {/* <div className="flex flex-col gap-4 lg:flex-row lg:gap-7 w-full max-w-[1200px] mx-auto"> */}
        <section className="border-black-300 grid h-[336px] w-full max-w-[640px] place-items-center rounded-2xl border p-5 md:h-[540px] lg:h-[640px]">
          <MyPlanCalendar
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            currentDate={currentDate}
            filteredSchedulesInThisMonth={renderPlanList}
            heartsPlan={heartsPlan}
          />
        </section>
        {/* 일정 리스트 부분 */}
        <section className="w-full max-w-[640px] rounded-2xl bg-yellow-200">
          <div className="w-full rounded-lg border p-4 shadow-sm">
            <ScheduleTitle
              selectedDate={selectedDate as Date}
              currentDate={currentDate}
            />

            {renderPlanList && renderPlanList.length > 0 ? (
              renderPlanList.map((plan) => (
                <ScheduleList key={plan.planId} renderPlanListData={plan} />
              ))
            ) : (
              <div className="ml-1 mt-4 text-sm text-gray-600">
                일정이 존재하지 않습니다.
              </div>
            )}
          </div>
        </section>
      </div>
    </MypageLayout>
  );
}
