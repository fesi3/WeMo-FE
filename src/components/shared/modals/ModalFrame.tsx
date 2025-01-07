import { PropsWithChildren, useEffect } from 'react';
import ModalPortal from './ModalPortal';
import ModalBackDrop from './ModalBackDrop';

interface ModalFrameProps {
  onClose: () => void;
  isOpen: boolean;
  title?: string;
}

export default function ModalFrame({
  children,
  onClose,
  isOpen,
  title,
}: PropsWithChildren<ModalFrameProps>) {
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
        <div className="flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black w-full max-w-screen-md p-6">
          <div className="flex justify-end pb-10">
            {title ? <span className="grow">{title}</span> : null}
            <button onClick={onClose}>닫기버튼</button>
          </div>
          <div className="w-full h-full">{children}</div>
        </div>
      </ModalPortal>
    )
  );
}
