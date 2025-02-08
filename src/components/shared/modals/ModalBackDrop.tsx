import { useEffect } from 'react';

interface ModalBackDropProps {
  isOpen: boolean;
  handleClose: () => void;
}

export default function ModalBackDrop({
  isOpen,
  handleClose,
}: ModalBackDropProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  return (
    <div
      className="fixed inset-0 z-[11] bg-black opacity-50"
      onClick={() => handleClose()}
    />
  );
}
