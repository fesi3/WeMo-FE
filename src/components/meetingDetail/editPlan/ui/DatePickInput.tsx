import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

import CalendarPicker from '@/components/shared/calendar/CalendarPicker';
import Modal from '@/components/shared/modals/Modal';
import { CalendarDaysIcon } from '@heroicons/react/20/solid';
import Button from '@/components/shared/Button';
import ErrorWrapper from '@/components/shared/ErrorWrapper';

interface DatePickInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  label: string;
  isOpenCalendar: boolean;
  openCalendar: () => void;
  closeCalendar: () => void;
  onClickDate: (date: Date) => void;
  validate: RegisterOptions<T, Path<T>>;
  errorMessage?: string;
}
export default function DatePickInput<T extends FieldValues>({
  register,
  name,
  label,
  openCalendar,
  closeCalendar,
  isOpenCalendar,
  validate,
  onClickDate,
  errorMessage,
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
          <CalendarDaysIcon className="w-6 opacity-30" />
          <input
            {...register(name, validate)}
            className="w-full cursor-pointer outline-none"
            placeholder="날짜를 선택해 주세요"
          />
        </button>

        <Modal
          title={label}
          handleClose={closeCalendar}
          isOpen={isOpenCalendar}
          className="w-auto min-w-[350px]"
        >
          <div className="flex flex-col gap-6">
            <ErrorWrapper errorMessage={errorMessage}>
              <CalendarPicker onChange={onClickDate} />
            </ErrorWrapper>
            <Button
              onClick={closeCalendar}
              text="확인"
              size={'large'}
              height={40}
              disabled={!!errorMessage}
              className="w-full rounded-md"
            />
          </div>
        </Modal>
      </div>
    </>
  );
}
