import React from 'react';
import Modal from '../../../components/shared/modals/Modal';
import CalendarPicker from './CalendarPicker';
import useToggle from '../../../hooks/useToggle';
import dayjs from 'dayjs';

interface DateModalProps {
  selectedDate: string | null;
  onDateSelect: (date: string | null) => void;
}

export default function DateModal({
  selectedDate,
  onDateSelect,
}: DateModalProps) {
  const { toggleValue: isOpen, handleOpen, handleClose } = useToggle();
  //const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 달력에서 날짜를 선택했을 때 실행되는 함수
  const handleDateChange = (date: Date) => {
    onDateSelect(dayjs(date).format('YYYY-MM-DD')); // 상위 컴포넌트에 전달
    handleClose();
  };

  // 날짜 초기화
  //const handleReset = () => {
  //  setSelectedDate(null);
  //  onDateSelect(null);
  //  handleClose();
  //};

  const buttonText = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
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
          <button onClick={() => onDateSelect(null)}>전체보기</button>
        </div>
      </Modal>
    </div>
  );
}
