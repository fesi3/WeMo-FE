import Button from '@/shared/components/Button';
import Modal from '@/shared/components/modals/Modal';
import useToggle from '@/shared/hooks/useToggle';
import EditMeetingForm from './EditMeetingForm';
import { PlusIcon } from '@heroicons/react/20/solid';

export default function CreateMeetingButton() {
  const { handleClose, handleOpen, toggleValue } = useToggle();
  return (
    <>
      <Button className="w-[130px]" onClick={handleOpen}>
        <div className="flex items-center gap-3">
          <PlusIcon className="h-6 w-6" />
          <span>모임 만들기</span>
        </div>
      </Button>

      <Modal isOpen={toggleValue} handleClose={handleClose} title="모임 만들기">
        <EditMeetingForm handleCloseThisModal={handleClose} />
      </Modal>
    </>
  );
}
