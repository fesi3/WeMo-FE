import LightningCreateButton from './LightningCreateButton';
import LightningModal from './LightningModal';
import useToggle from '@/hooks/useToggle';
import Modal from '@/components/shared/modals/Modal';

const LightningCreateContainer = () => {
  const { toggleValue: isModalOpen, handleOpen, handleClose } = useToggle();

  return (
    <>
      <LightningCreateButton
        onClick={handleOpen} // 모달 열기
        isModalOpen={isModalOpen}
      />
      <Modal
        isOpen={isModalOpen}
        handleClose={handleClose}
        title="번개팟 만들기"
      >
        <LightningModal
          onClose={handleClose} // 모달 닫기 핸들러
        />
      </Modal>
    </>
  );
};

export default LightningCreateContainer;
