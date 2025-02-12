import React, { useState } from 'react';
import Calendar from 'react-calendar';

interface CalendarPickerProps {
  onChange?: (date: Date) => void;
  locale?: string;
  minDate?: Date;
  maxDate?: Date;
}

export default function CalendarPicker({
  onChange,
  locale = 'en-US',
}: CalendarPickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleChange = (value: Date) => {
    setSelectedDate(value);
    onChange?.(value);
  };

  return (
    <div className="w-full rounded-lg border bg-white p-4 text-center shadow-md">
      <Calendar
        prevLabel="◀"
        nextLabel="▶"
        prev2Label={null}
        next2Label={null}
        onChange={(value) => handleChange(value as Date)}
        value={selectedDate}
        locale={locale}
        className="w-full"
        tileClassName={({ date, view }) =>
          view === 'month'
            ? `p-2 text-center text-xs md:text-sm ${
                date.toDateString() === selectedDate.toDateString()
                  ? 'bg-primary-40 text-white rounded-lg font-semibold'
                  : 'hover:bg-primary-10 rounded-lg'
              }`
            : 'text-gray-700 text-xs md:text-sm p-2 text-center rounded-lg transition-colors'
        }
      />
    </div>
  );
}
