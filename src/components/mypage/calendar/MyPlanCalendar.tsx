import { Value } from '@/pages/user/[username]/calendar';
import { CalendarPlanData } from '@/types/mypageType';
import React from 'react';
import Calendar from 'react-calendar';
import styles from '@/styles/planCalendar.module.css';

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
  // heartsPlan,
}: CalendarComponentProps) => {
  // const tileContent = ({ date }: { date: Date }) => {
  //   // 현재 년도, 월과 비교하여 해당 일에 점 표시
  //   // heartsPlan에 포함된 날짜가 현재 날짜보다 큰 경우 민트 점, 작은 경우 회색 점
  //   if (heartsPlan.includes(date.getDate())) {
  //     return date.getDate() >= currentDate.day ? (
  //       <p className="text-primary-10">*</p> // 이용 예정 상태
  //     ) : (
  //       <p className="text-gray-700">*</p> // 이용 완료 상태
  //     );
  //   }
  //   return null;
  // };

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
        // tileContent={tileContent}
        tileClassName={({ date }) => {
          let classes = `${styles.tile} w-[45px] h-[50px] md:w-[60px] md:h-[62px] lg:h-[72px]`;

          // 오늘 날짜 스타일
          if (date.toDateString() === new Date().toDateString()) {
            classes += ` ${styles.tileNow}`;
          }

          // 선택된 날짜 스타일 (selectedDate 비교)
          if (
            selectedDate instanceof Date &&
            date.toDateString() === selectedDate.toDateString()
          ) {
            classes += ` ${styles.tileActive}`;
          }

          // 토요일 (초록색)과 일요일 (빨간색) 색상 적용
          if (date.getDay() === 6) {
            classes += ` ${styles.tileSaturday}`; // 토요일
          } else if (date.getDay() === 0) {
            classes += ` ${styles.tileSunday}`; // 일요일
          }

          return classes;
        }}
        className={`${styles.customCalendar} h-[336px] w-full rounded-lg border shadow-sm md:h-[450px] lg:h-[640px]`}
      />
    </div>
  );
};

export default MyPlanCalendar;
