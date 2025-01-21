import { EmailState } from '@/components/redux/reducers/emailReducer';
import Link from 'next/link';
import GNBItem from '../item';

function GNBHeader({ storedData }: { storedData: EmailState }) {
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
              <GNBItem text={'검색'} path={''} />
              {storedData?.email ? (
                <div>
                  <GNBItem
                    text={'마이페이지'}
                    path={`/user/${storedData.nickname}`}
                  />
                  <GNBItem text={'모든 리뷰'} path={'/all-reviews'} />
                </div>
              ) : (
                <GNBItem text={'로그인'} path={'/login'} />
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default GNBHeader;
