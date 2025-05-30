import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/shared/lib/redux/store';
import { twMerge } from 'tailwind-merge';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { closeToast } from '@/shared/utils/handleToast';

export default function ToastContainer() {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  const toasts = useSelector((state: RootState) => state.toast, shallowEqual);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPortalElement(document.getElementById('toast'));
    }
  }, []);
  if (!portalElement) return null;
  return createPortal(
    <>
      {toasts.length > 0 && (
        <div className="fixed bottom-[50px] right-[5px] z-[10] mx-4 flex flex-col gap-3">
          {toasts.map((toast) => (
            <motion.div
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              className={twMerge(
                'relative flex gap-5 rounded-lg border bg-white px-5 py-3',
                toast.status === 'success'
                  ? 'border-primary-10 text-primary-10'
                  : 'border-heart text-heart',
              )}
              key={toast.id}
            >
              <button onClick={() => closeToast(toast.id)}>
                <XMarkIcon className="h-6 w-6 text-black-sub" />
              </button>
              <span className="shrink-0">{toast.message}</span>
            </motion.div>
          ))}
        </div>
      )}
    </>,
    portalElement,
  );
}
