import { ReactNode } from 'react';

interface IconWithCountProps {
  icon: ReactNode;
  count: number;
  suffix?: string;
}
export default function IconWithCount({
  icon,
  count,
  suffix = '',
}: IconWithCountProps) {
  return (
    <div className="w-15 flex items-center justify-between gap-3">
      <div className="h-4 w-4 shrink-0">{icon}</div>
      <span className="shrink-0">{`${count}${suffix}`}</span>
    </div>
  );
}
