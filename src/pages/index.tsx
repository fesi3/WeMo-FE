'use client';
import useModal from '@/hooks/useModal';

export default function Home() {
  const { Modal, handleOpenModal } = useModal();
  return (
    <div className="h-[2000px]">
      <button onClick={handleOpenModal}>모달열기</button>
      <Modal title="모딜 예시">hello, Modal!</Modal>
    </div>
  );
}
