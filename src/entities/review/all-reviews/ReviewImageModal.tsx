import React from 'react';
import Modal from '@/shared/modals/Modal';
import Carousel from '@/shared/Carousel';

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
