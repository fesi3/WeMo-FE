import { ReactNode, useEffect } from 'react';

interface ModalBackDropProps {
  isOpen: boolean;
  handleClose: () => void;
  children: ReactNode;
}

export default function ModalBackDrop({
  isOpen,
  handleClose,
  children,
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
      className="fixed inset-0 z-[11] bg-black bg-opacity-50"
      onClick={() => handleClose()}
    >
      {children}
    </div>
  );
}
