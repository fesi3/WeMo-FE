import React, { useState } from 'react';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css'; // 기본 스타일

interface CalendarPickerProps {
  onChange?: (date: Date) => void;
  locale?: string;
  minDate?: Date;
  maxDate?: Date;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({
  onChange,
  locale = 'en-US',
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleChange = (value: Date) => {
    setSelectedDate(value);
    onChange?.(value);
  };

  return (
    <div className="react-calendar mx-auto w-full max-w-md rounded-lg border bg-white p-4 text-center shadow-md">
      <Calendar
        prevLabel="◀"
        prev2Label={null}
        nextLabel="▶"
        next2Label={null}
        onChange={(value) => handleChange(value as Date)}
        value={selectedDate}
        locale={locale}
        tileClassName={({ date, view }) =>
          view === 'month'
            ? `p-2 text-center ${
                date.toDateString() === selectedDate.toDateString()
                  ? 'bg-orange-500 text-white rounded-full font semibold'
                  : 'hover:bg-orange-100'
              }`
            : 'text-gray-700 text-sm p-2 text-center rounded-lg transition-colors'
        }
      />
    </div>
  );
};

export default CalendarPicker;
