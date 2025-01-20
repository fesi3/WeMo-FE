import ProfileCard from '@/components/mypage/ProfileCard';
import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import IndexNav from '@/components/mypage/IndexNav';
import axios from 'axios';
import { StaticImageData } from 'next/image';
import MypageLayout from '@/components/mypage/MypageLayout';
import StatisticsCard from '@/components/mypage/StatisticsCard';

const BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

export interface UserData {
  email: string;
  nickname: string;
  profileImagePath: string | StaticImageData;
  companyName: string;
  loginType: string;
  createdAt: string;
  joinedPlanCount: number;
  likedPlanCount: number;
  writtenReviewCount: number;
}

export default function MyPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  console.log(userData);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // 토큰이 없으면 로그인 페이지로 리다이렉트하거나, 기본 페이지 처리
          alert('로그인이 필요합니다!');
          return;
        }
        const response = await axios.get(
          `${BASE_URL}/my_user`, //api 호출 경로
          {
            headers: {
              Authorization: `Bearer ${token}`, // JWT 토큰
            },
          },
        );
        const responseData = response.data.data;

        console.log(responseData);
        setUserData(responseData);
      } catch (error) {
        console.error('api 에러', error);
      }
    }

    fetchUserData();
  }, []);

  const listItem = [
    {
      icon: '📆',
      title: '나의 일정',
      link: `/user/${userData?.nickname}/plan`,
    },
    {
      icon: '💑',
      title: '나의 모임',
      link: `/user/${userData?.nickname}/meeting`,
    },
    {
      icon: '⭐',
      title: '나의 리뷰',
      link: `/user/${userData?.nickname}/review`,
    },
  ];

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
              <ul className="mt-4 flex flex-col gap-4 sm:gap-10">
                {listItem.map((item, index) => (
                  <IndexNav
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    link={item.link}
                  />
                ))}
              </ul>
            </section>
          </>
        ) : (
          <p>로딩 중...</p>
        )}
      </div>
    </MypageLayout>
  );
}

// MyPage.getLayout = (page: ReactNode) => {
//   return <MypageLayout headerProps="마이페이지">{page}</MypageLayout>;
// };
