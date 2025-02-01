import { PropsWithChildren } from 'react';

interface SectionContainerProps {
  title: string;
  onClickViewMore: () => void;
}

//더보기 기능 붙이기
export default function SectionContainer({
  children,
  title,
  onClickViewMore,
}: PropsWithChildren<SectionContainerProps>) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex w-full items-end justify-between">
        <span className="font-bold">{title}</span>
        <button onClick={onClickViewMore} className="text-sm text-black-sub">
          {/* 더보기 */}
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
}
