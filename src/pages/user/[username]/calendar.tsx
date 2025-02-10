import React, { useCallback, useState } from 'react';
import {
  getDateInfo,
  getFilteredSchedulesByMonth,
  parseDateString,
} from '@/utils/dateUtils';
import ScheduleTitle from '@/components/mypage/calendar/schedule/ScheduleTitle';
import ScheduleList from '@/components/mypage/calendar/schedule/ScheduleList';
import MyPlanCalendar from '@/components/mypage/calendar/MyPlanCalendar';
import { StaticImageData } from 'next/image';
import temporaryImg from '@/assets/images/Rectangle 6188.png';

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export interface SchedulePlanProps {
  planId: number;
  planName: string;
  planImagePath: string | StaticImageData;
  dateTime: string | Date; // 서버에서는 string으로 응답줌
  category: string;
  addressDetail: string;
  isOpen: boolean; // 개설 확정 상태
  isCompelete: boolean; // 이용 완료 상태
}

// interface CalendarPageProps {
//   serverPlansData: SchedulePlanProps[];
// }

const serverPlansData: SchedulePlanProps[] = [
  {
    planId: 1,
    planName: '노래방',
    dateTime: '2025-02-10',
    isOpen: true,
    isCompelete: false,
    category: '달램핏',
    planImagePath: temporaryImg,
    addressDetail: '강남구',
  },
  {
    planId: 12,
    planName: '운동',
    dateTime: '2025-02-11',
    isOpen: true,
    isCompelete: false,
    category: '달램핏',
    planImagePath: temporaryImg,
    addressDetail: '마포구',
  },
  {
    planId: 2,
    planName: '축구',
    dateTime: '2025-02-01',
    isOpen: true,
    isCompelete: true,
    category: '달램핏',
    planImagePath: temporaryImg,
    addressDetail: '종로구',
  },
];

// export default function CalendarPage( props : InferGetServerSidePropsType<typeof getServerSideProps>) {
export default function CalendarPage() {
  // console.log(props.calendarPlan);
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Value>(today); // 선택한 날짜 상태 (초기화: 오늘날짜)

  // 일정 날짜를 string -> date 객체로 변환
  const parsedPlansDate = serverPlansData.map((plan) => ({
    ...plan,
    date: parseDateString(plan.dateTime),
  }));

  const handleDateChange = useCallback((newDate: Value) => {
    setSelectedDate(newDate);
  }, []);

  // 현재 날짜의 연,월,일 구하기 - 유틸 함수로 분리
  const currentDate = getDateInfo();
  console.log('현재 날짜', currentDate);

  // 일정 필터링 - 이달의 일정
  const filteredSchedulesInThisMonth = getFilteredSchedulesByMonth(
    parsedPlansDate,
    `${currentDate.year}-${currentDate.month}`,
  );

  console.log('이달의 일정', filteredSchedulesInThisMonth);

  //이달의 일정 추출(하트 표시 위함)
  const heartsPlan = [
    ...new Set(
      filteredSchedulesInThisMonth.map(
        (schedule) => getDateInfo(schedule.dateTime).day,
      ),
    ),
  ];
  console.log('중복 제거한 이달의 일정이 있는 날짜 반환', heartsPlan);

  // 선택한 날짜 = 이달의 일정 배열에서의 날짜 -> 일정 리스트를 렌더링
  const renderPlanList = filteredSchedulesInThisMonth.filter((plan) => {
    const planDateInfo = getDateInfo(plan.dateTime); // 서버로부터 받은 일정의 날짜
    const selectedDateInfo = getDateInfo(selectedDate as Date); // 선택한 날짜
    return planDateInfo.day === selectedDateInfo.day;
  });

  console.log(
    `선택한 날짜에 있는 일정? ${renderPlanList.length} 개`,
    renderPlanList,
  );

  return (
    <div>
      <MyPlanCalendar
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
        currentDate={currentDate}
        filteredSchedulesInThisMonth={renderPlanList}
        heartsPlan={heartsPlan}
      />
      <div className="w-full rounded-lg border p-4 shadow-sm md:w-1/2">
        <ScheduleTitle
          selectedDate={selectedDate as Date}
          currentDate={currentDate}
        />

        {renderPlanList && renderPlanList.length > 0 ? (
          renderPlanList.map((plan) => (
            <ScheduleList key={plan.planId} renderPlanListData={plan} />
          ))
        ) : (
          <p className="text-sm text-gray-500">일정이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
