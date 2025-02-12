import { lazy, Suspense } from 'react';
import { useMypageUserInfo } from '@/hooks/mypage/fetch/useMypageData';
import MypageLayout from '@/components/mypage/MypageLayout';

// Lazy load ProfileCard, StatisticsCard, and IndexNav components
const ProfileCard = lazy(() => import('@/components/mypage/ProfileCard'));
const StatisticsCard = lazy(() => import('@/components/mypage/StatisticsCard'));
const IndexNav = lazy(() => import('@/components/mypage/IndexNav'));

export default function MyPage() {
  // const { data, isLoading, error } = useMypageUserInfo();
  const { data, error } = useMypageUserInfo();
  const userData = data?.data;

  // if (isLoading) return <div>Loading...</div>;
  if (error) return <div>[Error!!] {error.message}</div>;
  if (!userData) return <div>No Data...</div>;

  return (
    <MypageLayout headerProps="마이페이지">
      <div className="flex flex-col gap-4 md:gap-7">
        {userData ? (
          <>
            <section>
              <Suspense fallback={<div>Loading Profile...</div>}>
                <ProfileCard user={userData} />
              </Suspense>
            </section>
            <section>
              <Suspense fallback={<div>Loading Statistics...</div>}>
                <StatisticsCard user={userData} />
              </Suspense>
            </section>
            <section className="mt-3">
              <Suspense fallback={<div>Loading Navigation...</div>}>
                <IndexNav nickname={userData?.nickname} />
              </Suspense>
            </section>
          </>
        ) : (
          <p>로딩 중...</p>
        )}
      </div>
    </MypageLayout>
  );
}
