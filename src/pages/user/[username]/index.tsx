import ProfileCard from '@/components/mypage/ProfileCard';
import React from 'react';
import IndexNav from '@/components/mypage/IndexNav';
import MypageLayout from '@/components/mypage/MypageLayout';
import StatisticsCard from '@/components/mypage/StatisticsCard';
import { useMypageUserInfo } from '@/hooks/mypage/fetch/useMypageData';

export default function MyPage() {
  const { data, isLoading, error } = useMypageUserInfo();
  const userData = data?.data;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>[Error!!]{error.message}</div>;
  if (!userData) return <div>No Data...</div>;

  return (
    <MypageLayout headerProps="마이페이지">
      <div className="flex flex-col gap-7 sm:gap-10">
        {userData ? (
          <>
            <section>
              <ProfileCard user={userData} />
            </section>
            <section>
              <StatisticsCard user={userData} />
            </section>
            <section>
              <IndexNav nickname={userData?.nickname} />
            </section>
          </>
        ) : (
          <p>로딩 중...</p>
        )}
      </div>
    </MypageLayout>
  );
}
