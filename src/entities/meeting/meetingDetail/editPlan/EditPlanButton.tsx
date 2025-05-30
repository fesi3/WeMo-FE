import Modal from '@/shared/components/modals/Modal';
import useToggle from '@/shared/hooks/useToggle';
import EditPlanForm from './EditPlanForm';
import Button from '@/shared/components/Button';

export default function EditPlanButton() {
  const { toggleValue, handleOpen, handleClose } = useToggle();
  return (
    <>
      <Button
        text={'일정 만들기'}
        size={'large'}
        height={42}
        onClick={handleOpen}
        className="w-full rounded-md"
      />
      <Modal isOpen={toggleValue} handleClose={handleClose} title="일정 만들기">
        <EditPlanForm handleCloseThisModal={handleClose} />
      </Modal>
    </>
  );
}
