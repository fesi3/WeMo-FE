import React from 'react';
import Modal from '@/components/shared/modals/Modal'; // Modal 컴포넌트
import Carousel from '@/components/shared/Carousel'; // Carousel 컴포넌트

interface ReviewImageModalProps {
  isOpen: boolean;
  handleClose: () => void;
  images: string[];
}

const ReviewImageModal: React.FC<ReviewImageModalProps> = ({
  isOpen,
  handleClose,
  images,
}) => {
  return (
    <Modal isOpen={isOpen} handleClose={handleClose} title="리뷰 이미지">
      <Carousel images={images} />
    </Modal>
  );
};

export default ReviewImageModal;
