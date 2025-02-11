import React from 'react';
import dayjs from 'dayjs';
import { getDateInfo } from '@/utils/dateUtils';

interface ScheduleTitleProps {
  selectedDate: Date | null;
  currentDate: { day: number };
}

const ScheduleTitle = ({ selectedDate, currentDate }: ScheduleTitleProps) => {
  const selectedDateInfo = getDateInfo(selectedDate as Date);

  return (
    <h2 className="text-lg font-semibold text-gray-900">
      {selectedDateInfo.day === currentDate.day
        ? '오늘의 일정'
        : `${dayjs(selectedDate).format('M월 D일')} 일정`}
    </h2>
  );
};

export default ScheduleTitle;
