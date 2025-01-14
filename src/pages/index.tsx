// pages/index.tsx
import React, { useState } from 'react';
import CalendarPicker from '@/components/shared/calendar/CalendarPicker';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateChange = (date: Date) => {
    console.log('선택한 날짜+시간:', date);
    setSelectedDate(date);
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">모임 찾기 필터</h1>
      <CalendarPicker
        onChange={handleDateChange}
        //minDate={new Date()}
        // UI 스타일을 Tailwind로 더 꾸밀 수 있음
        //containerClassName="flex flex-col md:flex-row bg-white p-4 rounded-xl shadow space-y-4 md:space-y-0 md:space-x-6"
        //timeItemSelectedClassName="bg-orange-500 text-white"
      />
      <div className="mt-6">
        <p>현재 선택된 날짜: {selectedDate.toLocaleDateString()}</p>
      </div>
    </div>
  );
}
