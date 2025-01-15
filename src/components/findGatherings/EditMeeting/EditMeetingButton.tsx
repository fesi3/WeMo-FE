import Button from '@/components/shared/Button';
import Modal from '@/components/shared/modals/Modal';
import useToggle from '@/hooks/useToggle';
import EditMeetingForm from './EditMeetingForm';

//다은님 이거 그대로 붙여주시면 됩니다
export default function EditMeetingButton() {
  const { handleClose, handleOpen, toggleValue } = useToggle();
  return (
    <>
      <Button
        text="모임 만들기"
        type="meeting_create"
        backColor="relative top-5 bg-primary-10 text-white w-full"
        onClick={handleOpen}
      />
      <Modal isOpen={toggleValue} handleClose={handleClose} title="모임 만들기">
        <EditMeetingForm />
      </Modal>
    </>
  );
}
