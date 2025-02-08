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
        <ModalBackDrop isOpen={isOpen} handleClose={handleClose} />
        <div className="flex w-full flex-col rounded-lg bg-white p-6 text-black">
          <button onClick={handleClose}>
            <XMarkIcon className="w-8 opacity-50" />
          </button>
          <div className="h-full w-full">{children}</div>
        </div>
      </ModalPortal>
    )
  );
}

export default SearchModal;
