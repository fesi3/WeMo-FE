import { PropsWithChildren } from 'react';
import ModalPortal from './ModalPortal';

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
  return (
    isOpen && (
      <ModalPortal>
        <div className="flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black w-full max-w-screen-md p-6">
          <div className="flex justify-end pb-10">
            {title ? <span className="grow">title</span> : null}
            <button onClick={onClose}>닫기버튼</button>
          </div>
          <div className="w-full h-full">{children}</div>
        </div>
      </ModalPortal>
    )
  );
}
