import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일

interface CalendarPickerProps {
  /** 날짜가 바뀔 때마다 부모에게 알리는 콜백 */
  onChange?: (date: Date) => void;
  /** 달력을 감싸는 최상단 css */
  className?: string;
  locale?: string;
  minDate?: Date;
  maxDate?: Date;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({
  onChange,
  className = 'bg-white rounded p-4 shadow',
  locale = 'ko-KR',
  minDate, //={new Date('2025-01-01')},
  maxDate,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleChange = (value: Date) => {
    setSelectedDate(value);
    onChange?.(value);
  };

  return (
    <div className={className}>
      <Calendar
        prevLabel="◀"
        nextLabel="▶"
        onChange={(value) => handleChange(value as Date)}
        value={selectedDate}
        locale={locale}
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  );
};

export default CalendarPicker;
