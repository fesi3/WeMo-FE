import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/images/title.png';
import GNBItem from '../item';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';

// GNB 레이아웃 컴포넌트에서 렌더링 되는 header 컴포넌트입니다.
// 페이지마다 출력이 달라 path를 조회해 조건부 렌더링 합니다.
// 로그인 여부를 전역객체에서 조회해 조건부 렌더링 합니다.
// 상위 컴포넌트로 부터 유저 정보 응답을 내려받아 라우팅 합니다.
function GNBHeader() {
  const router = useRouter();
  const hideGnbHeaderRoutes = ['/login', '/start'];
  const showGnbHeader = hideGnbHeaderRoutes.includes(router.pathname);
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);

  return (
    <>
      {showGnbHeader || (
        <>
          <header className="invisible md:visible">
            <div className="fixed top-0 z-10 flex h-16 w-full items-center bg-white shadow-md md:flex md:h-[80px]">
              <div className="flex w-full justify-between px-5">
                <Link href={'/plans'}>
                  <Image
                    width={88.33}
                    height={24.33}
                    src={logo}
                    alt="wemo-gnb-logo"
                  />
                </Link>
                <div className="flex items-center">
                  <ul className="flex space-x-6">
                    <GNBItem text={'홈'} path={'/plans'} />
                    <GNBItem text={'모든 리뷰'} path={'/all-reviews'} />
                    <GNBItem text={'모임 찾기'} path={'/all-meetings'} />
                    {isLoggedIn ? (
                      <>
                        <GNBItem
                          text={'마이페이지'}
                          path={`/user/${user?.nickname}`}
                        />
                      </>
                    ) : (
                      <GNBItem text={'로그인'} path={'/start'} />
                    )}
                  </ul>
                </div>
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
