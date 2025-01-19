import ArrowLeft from '@/assets/icons/arrow-left.svg';
import { useRouter } from 'next/router';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const router = useRouter();
  const onClickBack = () => {
    router.back();
  };
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
