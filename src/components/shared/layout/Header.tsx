import ArrowLeft from '@/assets/icons/arrow-left.svg';

interface HeaderProps {
  title: string;
  onClickBack: () => void;
}

/**
 * @param title 헤더에 표시될 제목
 * @param onClickBack 뒤로가기 눌렀을 때 동작   */
export default function Header({ title, onClickBack }: HeaderProps) {
  return (
    <>
      <div className="h-12 w-full"> </div>
      <div className="fixed top-0 z-[9] flex h-12 w-full items-center gap-4 bg-white p-3 text-xl font-bold shadow-sm">
        <button onClick={onClickBack}>
          <ArrowLeft width={10} height={18} />
        </button>
        <span>{title}</span>
      </div>
    </>
  );
}
