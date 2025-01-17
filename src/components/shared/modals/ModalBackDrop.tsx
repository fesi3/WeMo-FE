import { useEffect } from 'react';

export default function ModalBackDrop({ isOpen }: { isOpen: boolean }) {
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
  return <div className="fixed inset-0 z-[11] bg-black opacity-50" />;
}
