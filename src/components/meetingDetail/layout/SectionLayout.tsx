import { PropsWithChildren } from 'react';

interface SectionLayoutProps {
  title: string;
  onClickViewMore: () => void;
}

export default function SectionLayout({
  children,
  title,
  onClickViewMore,
}: PropsWithChildren<SectionLayoutProps>) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex w-full items-end justify-between">
        <span className="font-bold">{title}</span>
        <button onClick={onClickViewMore} className="text-sm text-black-sub">
          더보기
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
}
