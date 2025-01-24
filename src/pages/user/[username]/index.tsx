import ProfileCard from '@/components/mypage/ProfileCard';
import React from 'react';
import IndexNav from '@/components/mypage/IndexNav';
import MypageLayout from '@/components/mypage/MypageLayout';
import StatisticsCard from '@/components/mypage/StatisticsCard';
import { UserData } from '@/types/mypageType';
import useFetchData from '@/api/mypage/useFetchData';

export default function MyPage() {
  const {
    data: userData,
    loading,
    error,
  } = useFetchData<UserData>(`/api/auths/users`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  // console.log('닉네임', userData?.nickname);
  // console.log(userData);

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
