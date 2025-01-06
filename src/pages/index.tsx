// pages/index.tsx
import React, { useState } from 'react';
import CalendarTimePicker from '../components/@shared/CalendarPicker';

export default function Home() {
  const [selectedDatetime, setSelectedDatetime] = useState<Date>(new Date());

  const handleDateChange = (date: Date) => {
    console.log('선택한 날짜+시간:', date);
    setSelectedDatetime(date);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">모임 찾기 필터</h1>
      <CalendarTimePicker
        onChange={handleDateChange}
        //initialDate={new Date()}
        // UI 스타일을 Tailwind로 더 꾸밀 수 있음
        //containerClassName="flex flex-col md:flex-row bg-white p-4 rounded-xl shadow space-y-4 md:space-y-0 md:space-x-6"
        //timeItemSelectedClassName="bg-orange-500 text-white"
      />
      <div className="mt-6">
        <p>현재 선택된 날짜+시간: {selectedDatetime.toLocaleString()}</p>
      </div>
    </div>
  );
}
