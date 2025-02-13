import { CalendarPlanData } from '@/types/mypageType';
import React from 'react';
import Calendar from 'react-calendar';
import styles from '@/styles/planCalendar.module.css';
import { Value } from '@/pages/user/calendar';

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
    // heartsPlan에 포함된 날짜가 현재 날짜보다 큰 경우 민트 점, 작은 경우 회색 점
    if (heartsPlan.includes(date.getDate())) {
      // 이용 완료/이용 예정 구분 (일을 비교)
      return date.getDate() >= currentDate.day ? (
        <div className="relative flex flex-col items-center">
          <div className="absolute top-1 h-1.5 w-1.5 rounded-full bg-primary-10" />
        </div>
      ) : (
        <div className="relative flex flex-col items-center">
          <div className="absolute top-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.calendar}>
      {/* (현재 연월 표시) */}
      <div className="mb-3 rounded-2xl bg-primary-90 p-2 text-center text-lg font-semibold md:mb-5">
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
        tileClassName={({ date }) => {
          // 각 날짜의 칸 스타일
          let classes = `${styles.tile} w-[45px] h-[50px] md:w-[60px] md:h-[72px] lg:h-[84px]`;

          // 오늘 날짜 스타일
          if (date.toDateString() === new Date().toDateString()) {
            classes += ` ${styles.tileToday}`;
          }

          // 선택된 날짜 스타일 (selectedDate 비교)
          if (
            selectedDate instanceof Date &&
            date.toDateString() === selectedDate.toDateString()
          ) {
            classes += ` ${styles.tileActive}`;
          }

          // 토요일 (파란색)과 일요일 (빨간색) 색상 적용
          if (date.getDay() === 6) {
            classes += ` ${styles.tileSaturday}`; // 토요일
          } else if (date.getDay() === 0) {
            classes += ` ${styles.tileSunday}`; // 일요일
          }

          return classes;
        }}
        className={`h-full w-full items-center justify-center rounded-lg text-center lg:h-[450px]`}
      />
    </div>
  );
};

export default MyPlanCalendar;
