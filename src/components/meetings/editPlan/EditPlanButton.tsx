import Modal from '@/components/shared/modals/Modal';
import useToggle from '@/hooks/useToggle';
import EditPlanForm from './EditPlanForm';
import { useSelector } from 'react-redux';
import { RootState } from '@/components/redux/authReducers';

interface EditPlanButtonProps {
  email: string;
}
export default function EditPlanButton({ email }: EditPlanButtonProps) {
  const { toggleValue, handleOpen, handleClose } = useToggle();
  const userEmail = useSelector((state: RootState) => state.email);
  return (
    <>
      {email === userEmail.email && (
        <button
          className="h-[42px] w-full rounded-md bg-primary-10 font-bold text-white"
          onClick={handleOpen}
        >
          일정 만들기
        </button>
      )}
      <Modal isOpen={toggleValue} handleClose={handleClose} title="일정 만들기">
        <EditPlanForm handleCloseThisModal={handleClose} />
      </Modal>
    </>
  );
}
