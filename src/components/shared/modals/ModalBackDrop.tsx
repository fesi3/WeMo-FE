import { ReactNode, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

interface ModalBackDropProps {
  isOpen: boolean;
  handleClose: () => void;
  className?: string;
  children: ReactNode;
}

export default function ModalBackDrop({
  isOpen,
  handleClose,
  className,
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
      className={twMerge(
        'fixed inset-0 z-[11] bg-black bg-opacity-50',
        className,
      )}
      onClick={() => handleClose()}
    >
      {children}
    </div>
  );
}
