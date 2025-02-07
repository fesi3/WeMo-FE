import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/images/title.png';
import GNBItem from '../item';
import { useRouter } from 'next/router';
import { hideGnbHeaderRoutes } from '@/constants/gnb';

// GNB 레이아웃 컴포넌트에서 렌더링 되는 header 컴포넌트입니다.
// 페이지마다 출력이 달라 path를 조회해 조건부 렌더링 합니다.
// 로그인 여부를 전역객체에서 조회해 조건부 렌더링 합니다.
// 상위 컴포넌트로 부터 유저 정보 응답을 내려받아 라우팅 합니다.
function GNBHeader() {
  const router = useRouter();
  const showGnbHeader = hideGnbHeaderRoutes.includes(router.pathname);

  return (
    <>
      {showGnbHeader || (
        <>
          <header>
            <div className="fixed top-0 z-10 flex w-full items-center bg-white py-2 shadow-md">
              <div className="flex h-9 w-full justify-between px-9">
                <Link href={'/plans'} className="my-auto">
                  <Image width={70} height={0} src={logo} alt="wemo-gnb-logo" />
                </Link>
                <nav className="flex items-center">
                  <ul className="flex space-x-6">
                    <GNBItem name={'검색'} isHeader isRouteDisabled />
                    <GNBItem name={'알림'} isHeader isRouteDisabled />
                  </ul>
                </nav>
              </div>
            </div>
          </header>
          <div className="invisible md:h-[80px]" />
        </>
      )}
    </>
  );
}

export default GNBHeader;
