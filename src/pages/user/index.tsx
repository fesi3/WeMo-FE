import { lazy, Suspense } from 'react';
import { useMypageUserInfo } from '@/hooks/mypage/fetch/useMypageData';
import MypageLayout from '@/components/mypage/MypageLayout';
import IndexNav from '@/components/mypage/IndexNav';

// Lazy load ProfileCard, StatisticsCard, and IndexNav components
const ProfileCard = lazy(() => import('@/components/mypage/ProfileCard'));
const StatisticsCard = lazy(() => import('@/components/mypage/StatisticsCard'));

export default function MyPage() {
  const { data, isFetching, error } = useMypageUserInfo();
  const userData = data?.data;

  // if (isFetching) return <div>Loading...</div>;
  if (error) return <div>[Error!!] {error.message}</div>;
  // if (!userData) return <div>No Data...</div>;

  return (
    <MypageLayout>
      <div className="flex flex-col gap-4 rounded-lg p-4 md:gap-7">
        {!isFetching && userData ? (
          <>
            <section>
              <Suspense fallback={<div>Loading Profile...</div>}>
                <ProfileCard user={userData} />
              </Suspense>
            </section>
            <section>
              <StatisticsCard user={userData} />
            </section>
            <section className="mt-3">
              <IndexNav />
            </section>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </MypageLayout>
  );
}
