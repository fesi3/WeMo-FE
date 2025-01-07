import ModalFrame from '@/components/shared/modals/ModalFrame';
import { ReactNode, useState } from 'react';

interface ModalProps {
  children: ReactNode;
  title: string;
}

/** Modal 컴포넌트와 모달열기 함수를 반환합니다.
 * Modal 컴포넌트는 Children과 Title을 Props로 받습니다.
 */
export default function useModal() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const Modal = ({ children, title }: ModalProps) => (
    <ModalFrame isOpen={isOpenModal} onClose={handleCloseModal} title={title}>
      {children}
    </ModalFrame>
  );
  return { Modal, handleOpenModal };
}
