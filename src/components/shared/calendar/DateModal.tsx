import React, { useState } from 'react';
import Modal from '../../../components/shared/modals/Modal';
import CalendarPicker from './CalendarPicker';
import useToggle from '../../../hooks/useToggle';
import dayjs from 'dayjs';

interface DateModalProps {
  onDateSelect: (date: string | null) => void;
}

export default function DateModal({ onDateSelect }: DateModalProps) {
  const { toggleValue: isOpen, handleOpen, handleClose } = useToggle();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 달력에서 날짜를 선택했을 때 실행되는 함수
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);

    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    onDateSelect(formattedDate); // 날짜를 ISO 문자열로 변환하여 상위 컴포넌트로 전달
    console.log(formattedDate);
    handleClose();
  };

  // 날짜 초기화
  const handleReset = () => {
    setSelectedDate(null);
    onDateSelect(null);
    handleClose();
  };

  const buttonText = selectedDate
    ? selectedDate.toLocaleDateString() // or 원하는 포맷
    : '날짜 선택';

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleOpen}
        className="inline-flex items-center justify-between whitespace-nowrap rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-md focus:ring-2 focus:ring-blue-500"
      >
        {buttonText}
      </button>
      <Modal isOpen={isOpen} handleClose={handleClose} title="날짜 선택">
        <div>
          <CalendarPicker onChange={handleDateChange} />
          <button onClick={handleReset}> 전체보기 </button>
        </div>
      </Modal>
    </div>
  );
}
