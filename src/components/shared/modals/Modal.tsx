import { PropsWithChildren } from 'react';
import ModalPortal from './ModalPortal';
import ModalBackDrop from './ModalBackDrop';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { twMerge } from 'tailwind-merge';

export interface ModalProps {
  handleClose: () => void;
  isOpen: boolean;
  title?: string;
  className?: string;
}

//useToggle hook에서 isOpen과 handleClose를 연결해 주세요
export default function Modal({
  children,
  handleClose,
  isOpen,
  title,
  className,
}: PropsWithChildren<ModalProps>) {
  return (
    isOpen && (
      <ModalPortal>
        <ModalBackDrop isOpen={isOpen} handleClose={handleClose}>
          <div
            onClick={(e) => e.stopPropagation()}
            className={twMerge(
              'fixed left-1/2 top-1/2 z-[12] flex max-h-full w-full max-w-screen-md -translate-x-1/2 -translate-y-1/2 p-6',
              className,
            )}
          >
            <div className="flex w-full flex-col overflow-scroll rounded-lg bg-white p-6 text-black">
              <div className="flex justify-end pb-5">
                {title ? (
                  <span className="grow text-xl font-semibold">{title}</span>
                ) : null}
                <button onClick={handleClose}>
                  <XMarkIcon className="w-8 opacity-50" />
                </button>
              </div>
              <div className="h-full w-full">{children}</div>
            </div>
          </div>
        </ModalBackDrop>
      </ModalPortal>
    )
  );
}
