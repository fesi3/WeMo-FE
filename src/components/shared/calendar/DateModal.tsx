import React, { useState } from 'react';
import Modal from '../../../components/shared/modals/Modal';
import CalendarPicker from './CalendarPicker';
import useToggle from '../../../hooks/useToggle';

export default function DateModal() {
  const { toggleValue: isOpen, handleOpen, handleClose } = useToggle();
  //const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 달력에서 날짜를 선택했을 때 실행되는 함수
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
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
          <p>
            선택된 날짜:{' '}
            {selectedDate ? selectedDate.toLocaleDateString() : '없음'}
          </p>
        </div>
      </Modal>
    </div>
  );
}
