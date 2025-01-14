import { PropsWithChildren, useEffect } from 'react';
import ModalPortal from './ModalPortal';
import ModalBackDrop from './ModalBackDrop';

interface ModalProps {
  handleClose: () => void;
  isOpen: boolean;
  title: string;
}

//useToggle hook에서 isOpen과 handleClose를 연결해 주세요요
export default function Modal({
  children,
  handleClose,
  isOpen,
  title,
}: PropsWithChildren<ModalProps>) {
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
    isOpen && (
      <ModalPortal>
        <ModalBackDrop />
        <div className="fixed left-1/2 top-1/2 z-[11] flex w-full max-w-screen-md -translate-x-1/2 -translate-y-1/2 p-6">
          <div className="flex w-full flex-col rounded-lg bg-white p-6 text-black">
            <div className="flex justify-end pb-10">
              {title ? <span className="grow">{title}</span> : null}
              <button onClick={handleClose}>닫기버튼</button>
            </div>
            <div className="h-full w-full">{children}</div>
          </div>
        </div>
      </ModalPortal>
    )
  );
}
