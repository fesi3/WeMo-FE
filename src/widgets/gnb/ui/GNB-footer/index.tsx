import { useEffect, useState } from 'react';
import { hideGnbPathNames, menuItems } from '@/shared/constants/gnb';
import GNBItem from '@/widgets/gnb/ui/GNB-item';
import { useSelector } from 'react-redux';
import { RootState } from '@/shared/lib/redux/store';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/router';

// GNB 레이아웃 컴포넌트에서 렌더링 되는 footer 컴포넌트입니다.
// 페이지마다 출력이 달라 path를 조회해 조건부 렌더링 합니다.
// 로그인 여부를 전역객체에서 조회해 조건부 렌더링 합니다.
// 상위 컴포넌트로 부터 유저 정보 응답을 내려받아 라우팅 합니다.
function GNBFooter() {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [isVisible, setIsVisible] = useState(true); // Tracks visibility
  const [lastScrollY, setLastScrollY] = useState(0); // Tracks last scroll position

  const router = useRouter();
  const { pathname } = router;
  const shouldHideGNB = hideGnbPathNames.includes(pathname);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false); // Hide footer when scrolling down
      } else {
        setIsVisible(true); // Show footer when scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <footer
      className={twMerge(
        'fixed bottom-0 z-10 flex h-[50px] w-full items-center bg-white pt-1 shadow-md transition-transform duration-300',
        isVisible ? 'translate-y-0' : 'translate-y-full',
        shouldHideGNB ? 'invisible' : '',
      )}
    >
      <ul className="flex w-full justify-around px-5">
        {menuItems.map((item) => (
          <GNBItem key={item.key} name={item.name} path={item.path} />
        ))}
        <GNBItem
          name={isLoggedIn ? '마이페이지' : '로그인'}
          path={isLoggedIn ? `/user` : '/start'}
        />
      </ul>
    </footer>
  );
}

export default GNBFooter;
