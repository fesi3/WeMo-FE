import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

export default function ModalPortal({ children }: PropsWithChildren) {
  const portalElement = document.getElementById('modal') as HTMLElement;
  return createPortal(children, portalElement);
}
