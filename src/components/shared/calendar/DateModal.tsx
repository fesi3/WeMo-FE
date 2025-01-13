import React, { useState } from 'react';
import Modal from '../../../components/shared/modals/Modal';
import CalendarPicker from './CalendarPicker';
import useToggle from '../../../hooks/useToggle';

interface DateModalProps {
  onDateSelect: (date: string | null) => void;
}

export default function DateModal({ onDateSelect }: DateModalProps) {
  const { toggleValue: isOpen, handleOpen, handleClose } = useToggle();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 달력에서 날짜를 선택했을 때 실행되는 함수
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    const formattedDate = date.toLocaleDateString();
    onDateSelect(formattedDate); // 날짜를 ISO 문자열로 변환하여 상위 컴포넌트로 전달
    console.log(formattedDate);
    handleClose();
  };

  const buttonText = selectedDate
    ? selectedDate.toLocaleDateString() // or 원하는 포맷
    : '날짜 전체';

  return (
    <div>
      <button onClick={handleOpen}>{buttonText}</button>
      <Modal isOpen={isOpen} handleClose={handleClose} title="날짜 선택 모달">
        <div>
          <CalendarPicker onChange={handleDateChange} />
        </div>
      </Modal>
    </div>
  );
}
