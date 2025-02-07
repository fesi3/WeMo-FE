import ProfileCard from '@/components/mypage/ProfileCard';
import React from 'react';
import IndexNav from '@/components/mypage/IndexNav';
import MypageLayout from '@/components/mypage/MypageLayout';
import StatisticsCard from '@/components/mypage/StatisticsCard';
import { UserDataResponse } from '@/types/mypageType';
import instance from '@/api/axiosInstance';
import { useQuery } from '@tanstack/react-query';

// 마이 페이지 데이터를 가져오는 함수
const fetchMypageUserInfo = async () => {
  const response = await instance<UserDataResponse>('/api/auths/users');
  return response.data;
};

// 마이페이지 사용자 데이터를 가져오는 커스텀 훅
function useMypageUserInfo() {
  // const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return useQuery({
    queryKey: ['mypageIndex'],
    queryFn: fetchMypageUserInfo,
    //   enabled: isLoggedIn, // (로그인 상태일 때만 실행)
    staleTime: 100 * 1000, // 10초
  });
}

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
