import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일

interface CalendarPickerProps {
  /** 날짜가 바뀔 때마다 부모에게 알리는 콜백 */
  onChange?: (date: Date) => void;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleChange = (value: Date) => {
    setSelectedDate(value);
    onChange?.(value);
  };

  return (
    <div>
      <Calendar
        onChange={(value) => handleChange(value as Date)}
        value={selectedDate}
      />
    </div>
  );
};

export default CalendarPicker;
