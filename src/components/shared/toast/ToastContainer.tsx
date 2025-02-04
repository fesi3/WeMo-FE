import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { twMerge } from 'tailwind-merge';

export default function ToastContainer() {
  const toasts = useSelector((state: RootState) => state.toast);

  return (
    toasts.length >= 0 && (
      <div className="fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-3">
        {toasts.map((toast) => (
          <div
            className={twMerge(
              'px-10 py-5 text-white',
              toast.status === 'success' ? 'bg-primary-10' : 'bg-heart',
            )}
            key={toast.id}
          >
            {toast.message}
          </div>
        ))}
      </div>
    )
  );
}
