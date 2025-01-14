import { PropsWithChildren } from 'react';

export default function DateBadge({ children }: PropsWithChildren) {
  return (
    <div className="flex h-6 items-center justify-center rounded-[4px] bg-primary-10 px-2 py-0.5 text-sm font-medium text-white">
      {children}
    </div>
  );
}
