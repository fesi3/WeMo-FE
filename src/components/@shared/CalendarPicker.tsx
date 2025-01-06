import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일

interface CalendarPickerProps {
  /** 날짜가 바뀔 때마다 부모에게 알리는 콜백 */
  onChange?: (date: Date) => void;
  /** 달력을 감싸는 최상단 css */
  calendarClassName?: string;
  locale?: string;
  minDate?: Date;
  maxDate?: Date;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({
  onChange,
  calendarClassName = 'flex flex-col bg-white p-4 rounded-lg shadow-md',
  locale = 'ko-KR',
  minDate,
  maxDate,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleChange = (value: Date) => {
    setSelectedDate(value);
    onChange?.(value);
  };

  return (
    <div className={calendarClassName}>
      <Calendar
        prevLabel="◀"
        nextLabel="▶"
        onChange={(value) => handleChange(value as Date)}
        value={selectedDate}
        locale={locale}
        minDate={minDate}
        maxDate={maxDate}
        tileClassName={({ date }) => {
          const today = new Date();
          if (date.toDateString() === selectedDate.toDateString()) {
            return 'bg-orange-500 text-white rounded-lg'; // 선택된 날짜 스타일
          }
          if (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
          ) {
            return 'bg-yellow-300 text-black font-bold'; // 오늘 날짜 스타일
          }
          return 'hover:bg-gray-200 transition-colors duration-200'; // hover 스타일
        }}
      />
    </div>
  );
};

export default CalendarPicker;
