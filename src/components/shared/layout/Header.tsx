import ArrowLeft from '@/assets/icons/arrow-left.svg';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  const onClickBack = () => {
    router.back();
  };

  // pathName에 따라 title을
  const getTitle = () => {
    if (router.pathname === '/signup') {
      return '회원가입';
    }
  };

  const title = getTitle();

  return (
    <>
      <div className="h-12 w-full md:h-[80px]"></div>
      <div className="fixed top-0 z-[9] flex h-12 w-full items-center bg-white px-3 text-xl font-bold shadow-sm md:hidden">
        <button
          onClick={onClickBack}
          className="absolute left-3 flex items-center"
        >
          <ArrowLeft width={10} height={18} />
        </button>
        <span className="mx-auto">{title}</span>
      </div>
    </>
  );
}
