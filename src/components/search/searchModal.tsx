import { PropsWithChildren, useEffect } from 'react';
import ModalPortal from '@/components/shared/modals/ModalPortal';
import ModalBackDrop from '@/components/shared/modals/ModalBackDrop';
import CloseIcon from '@/assets/icons/close.svg';
import { ModalProps } from '@/components/shared/modals/Modal';
import { twMerge } from 'tailwind-merge';

//useToggle hook에서 isOpen과 handleClose를 연결해 주세요
function SearchModal({
  children,
  handleClose,
  isOpen,
  className,
}: PropsWithChildren<ModalProps>) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    isOpen && (
      <ModalPortal>
        <ModalBackDrop isOpen={isOpen} handleClose={handleClose}>
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-2 top-2"
          >
            <CloseIcon />
          </button>
          <div
            className={twMerge('z-[12]', className)}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </ModalBackDrop>
      </ModalPortal>
    )
  );
}

export default SearchModal;
