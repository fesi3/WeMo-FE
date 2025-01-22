import Modal from '@/components/shared/modals/Modal';
import useToggle from '@/hooks/useToggle';
import EditPlanForm from './EditPlanForm';

export default function EditPlanButton() {
  const { toggleValue, handleOpen, handleClose } = useToggle();

  return (
    <>
      <button
        className="h-[42px] w-full rounded-md bg-primary-10 font-bold text-white"
        onClick={handleOpen}
      >
        일정 만들기
      </button>

      <Modal isOpen={toggleValue} handleClose={handleClose} title="일정 만들기">
        <EditPlanForm handleCloseThisModal={handleClose} />
      </Modal>
    </>
  );
}
