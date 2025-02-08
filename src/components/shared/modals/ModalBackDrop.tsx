import { ReactNode, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

interface ModalBackDropProps {
  isOpen: boolean;
  isSearch?: boolean;
  handleClose: () => void;
  className?: string;
  children: ReactNode;
}

export default function ModalBackDrop({
  isOpen,
  isSearch = false,
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
        isSearch ? 'bg-opacity-80' : 'bg-opacity-50',
        'fixed inset-0 z-[11] bg-black',
        className,
      )}
      onClick={() => handleClose()}
    >
      {children}
    </div>
  );
}
