import Button from '@/components/shared/Button';
import Modal from '@/components/shared/modals/Modal';
import useToggle from '@/hooks/useToggle';
import EditMeetingForm from './EditMeetingForm';
import { PlusIcon } from '@heroicons/react/20/solid';

//다은님 이거 그대로 붙여주시면 됩니다
export default function EditMeetingButton() {
  const { handleClose, handleOpen, toggleValue } = useToggle();
  return (
    <>
      <Button onClick={handleOpen}>
        <PlusIcon />
        모임 만들기
      </Button>

      <Modal isOpen={toggleValue} handleClose={handleClose} title="모임 만들기">
        <EditMeetingForm handleCloseThisModal={handleClose} />
      </Modal>
    </>
  );
}
