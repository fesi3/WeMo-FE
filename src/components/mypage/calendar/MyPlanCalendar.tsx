import { Value } from '@/pages/user/[username]/calendar';
import { CalendarPlanData } from '@/types/mypageType';
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface CalendarComponentProps {
  selectedDate: Value;
  handleDateChange: (newDate: Value) => void;
  currentDate: { year: number; month: number; day: number };
  filteredSchedulesInThisMonth: CalendarPlanData[];
  heartsPlan: number[];
}

const MyPlanCalendar = ({
  selectedDate,
  handleDateChange,
  currentDate,
  heartsPlan,
}: CalendarComponentProps) => {
  const tileContent = ({ date }: { date: Date }) => {
    // 현재 년도, 월과 비교하여 해당 일에 점 표시
    // heartsPlan에 포함된 날짜가 현재 날짜보다 큰 경우 민트 점, 작은 경우 회색 점
    if (heartsPlan.includes(date.getDate())) {
      return date.getDate() >= currentDate.day ? (
        <p className="text-primary-10">*</p> // 이용 예정 상태
      ) : (
        <p className="text-gray-700">*</p> // 이용 완료 상태
      );
    }
    return null;
  };

  return (
    <div>
      {/* (현재 연월 표시) */}
      <div className="mb-2 text-center text-lg font-semibold">
        {`${currentDate.year}년 ${currentDate.month}월`}
      </div>
      <Calendar
        onChange={handleDateChange} // 사용자가 선택한 날짜를 전달
        value={selectedDate}
        calendarType="gregory"
        showNeighboringMonth={false}
        formatDay={(locale, date) => date.getDate().toString()}
        showNavigation={false}
        view="month"
        tileContent={tileContent}
        className="w-full rounded-lg border shadow-sm"
      />
    </div>
  );
};

export default MyPlanCalendar;
