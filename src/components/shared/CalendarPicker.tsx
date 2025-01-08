import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일

interface CalendarPickerProps {
  onChange?: (date: Date) => void;
  locale?: string;
  minDate?: Date;
  maxDate?: Date;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({
  onChange,
  locale = 'en-US',
  minDate,
  maxDate,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleChange = (value: Date) => {
    setSelectedDate(value);
    onChange?.(value);
  };

  return (
    <div className="react-calendar">
      <Calendar
        prevLabel="◀"
        prev2Label={null}
        nextLabel="▶"
        next2Label={null}
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
