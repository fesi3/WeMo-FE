import { lazy, Suspense } from 'react';
import MypageLayout from '@/entities/mypage/MypageLayout';
import IndexNav from '@/entities/mypage/IndexNav';
import Button from '@/shared/components/Button';
import useAuth from '@/shared/hooks/useAuth';

// Lazy load ProfileCard, StatisticsCard, and IndexNav components
const ProfileCard = lazy(() => import('@/entities/mypage/ProfileCard'));
const StatisticsCard = lazy(() => import('@/entities/mypage/StatisticsCard'));

export function MyPage() {
  const { response, isLoading, error } = useAuth();
  const userData = response?.data;
  console.log(error);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.response.data.message}</div>;
  if (!userData) return <div>No Data...</div>;

  return (
    <MypageLayout>
      <div className="flex flex-col gap-4 rounded-lg p-4 md:gap-7">
        {!isLoading && userData ? (
          <>
            <section>
              <Suspense fallback={<div>Loading Profile...</div>}>
                <ProfileCard user={userData} />
              </Suspense>
            </section>
            <section>
              <StatisticsCard user={userData} />
            </section>
            <section className="mb-6 mt-3">
              <IndexNav />
            </section>
          </>
        ) : (
          <p>Loading...</p>
        )}
        <div className="mt-auto flex items-center justify-center gap-3">
          <Button
            text="탈퇴하기"
            variant={'text'}
            className="py-1 text-gray-500 hover:text-red-600"
            onClick={() => {
              alert('준비 중인 기능입니다!');
            }}
          />
          {'|'}
          <Button
            text="로그아웃"
            variant={'text'}
            className="py-1 text-gray-500 underline hover:text-black"
            onClick={() => {
              alert('준비 중인 기능입니다!');
            }}
          />
        </div>
      </div>
    </MypageLayout>
  );
}
