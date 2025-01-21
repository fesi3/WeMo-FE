import { EmailState } from '@/components/redux/reducers/emailReducer';
import Link from 'next/link';
import { useRouter } from 'next/router';

function GNBHeader({ storedData }: { storedData: EmailState }) {
  const router = useRouter();
  return (
    <header>
      <div className="w-full md:h-[80px]"></div>
      <div className="fixed top-0 z-10 flex h-16 w-full items-center bg-white shadow-md md:flex md:h-[80px]">
        <div className="flex w-full justify-between px-5">
          {/* 이미지 교체 필요 */}
          <Link href={'/meetings'}>
            <span className="text-xl font-bold">WeMo</span>
          </Link>
          <div className="flex items-center">
            <ul className="flex space-x-6">
              <li
                className={`${
                  router.pathname === 'user'
                    ? 'font-bold text-black'
                    : 'text-gray-400'
                } invisible cursor-pointer transition-colors hover:text-black md:visible`}
              >
                {'검색'}
              </li>
              {storedData?.email ? (
                <>
                  <Link href={`/user/${storedData.nickname}`}>
                    <li
                      className={`${
                        router.pathname === 'user'
                          ? 'font-bold text-black'
                          : 'text-gray-400'
                      } cursor-pointer transition-colors hover:text-black`}
                    >
                      {'마이페이지'}
                    </li>
                  </Link>
                  <Link href={'allReviews'}>
                    <li
                      className={`${
                        router.pathname === 'user'
                          ? 'font-bold text-black'
                          : 'text-gray-400'
                      } invisible cursor-pointer transition-colors hover:text-black md:visible`}
                    >
                      {'찜한 모임'}
                    </li>
                  </Link>
                </>
              ) : (
                <Link href={'/start'}>
                  <li
                    className={`${
                      router.pathname === 'start'
                        ? 'font-bold text-black'
                        : 'text-gray-400'
                    } cursor-pointer transition-colors hover:text-black`}
                  >
                    {'로그인'}
                  </li>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default GNBHeader;
