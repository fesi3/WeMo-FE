import Button from '@/components/shared/Button';
import Modal from '@/components/shared/modals/Modal';
import useToggle from '@/hooks/useToggle';
import EditPlanForm from './EditPlanForm';

export default function EditPlanButton() {
  const { toggleValue, handleOpen, handleClose } = useToggle();
  return (
    <>
      <Button
        text="일정 만들기"
        type="meeting_create"
        backColor="relative top-5 bg-primary-10 text-white w-full"
        onClick={handleOpen}
      />
      <Modal isOpen={toggleValue} handleClose={handleClose} title="일정 만들기">
        <EditPlanForm handleCloseThisModal={handleClose} />
      </Modal>
    </>
  );
}
