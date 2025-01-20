import CalendarPicker from '@/components/shared/calendar/CalendarPicker';

import Modal from '@/components/shared/modals/Modal';

import Image from 'next/image';
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

interface DatePickInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  label: string;
  value: string;
  isOpenCalendar: boolean;
  openCalendar: () => void;
  closeCalendar: () => void;
  onClickDate: (date: Date) => void;
  validate: RegisterOptions<T, Path<T>>;
}
export default function DatePickInput<T extends FieldValues>({
  register,
  name,
  label,
  value,
  openCalendar,
  closeCalendar,
  isOpenCalendar,
  validate,
  onClickDate,
}: DatePickInputProps<T>) {
  return (
    <>
      <div className="form-label relative">
        {label}
        <button
          type="button"
          onClick={openCalendar}
          className="form-input flex w-1/2 items-center gap-2"
        >
          <Image
            src="/assets/icons/calendar.svg"
            alt={label}
            width={24}
            height={24}
          />
          <input
            value={value}
            {...register(name, validate)}
            readOnly
            className="w-full cursor-pointer outline-none"
            placeholder="날짜를 선택해 주세요"
          />
        </button>

        <Modal
          title={label}
          handleClose={closeCalendar}
          isOpen={isOpenCalendar}
        >
          <CalendarPicker onChange={onClickDate} />
        </Modal>
      </div>
    </>
  );
}
