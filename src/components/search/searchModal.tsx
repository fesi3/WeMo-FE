import { PropsWithChildren } from 'react';
import ModalPortal from '@/components/shared/modals/ModalPortal';
import ModalBackDrop from '@/components/shared/modals/ModalBackDrop';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { ModalProps } from '@/components/shared/modals/Modal';

//useToggle hook에서 isOpen과 handleClose를 연결해 주세요
function SearchModal({
  children,
  handleClose,
  isOpen,
}: PropsWithChildren<ModalProps>) {
  return (
    isOpen && (
      <ModalPortal>
        <ModalBackDrop isOpen={isOpen} handleClose={handleClose}>
          <button
            onClick={handleClose}
            className="absolute left-1 top-1 bg-white"
          >
            <XMarkIcon className="w-8 opacity-50" />
          </button>
          <div className="z-[12]">{children}</div>
        </ModalBackDrop>
      </ModalPortal>
    )
  );
}

export default SearchModal;
