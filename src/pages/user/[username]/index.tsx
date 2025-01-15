import ProfileCard from '@/components/mypage/ProfileCard';
import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import IndexNav from '@/components/mypage/IndexNav';
import axios from 'axios';
import { StaticImageData } from 'next/image';

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
        const response = await axios.get(
          `${BASE_URL}/my_user`, //api 호출 경로
          // {
          //   headers: {
          //     Authorization: ``, // JWT 토큰
          //   },
          // },
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
    <>
      <header className="bg-antiquewhite flex h-12 items-center justify-center bg-gray-100">
        마이페이지
      </header>
      <main className="flex flex-col gap-7 p-4">
        <ProfileCard user={userData} />
        <section className="flex flex-col gap-4">
          <ul>
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
      </main>
      <footer className="fixed bottom-0 left-0 z-50 flex h-12 w-full items-center justify-center border-t border-gray-300 bg-gray-100">
        nav 자리
      </footer>
    </>
  );
}

// MyPage.getLayout = (page: ReactNode) => {
//   return <MypageLayout headerProps="마이페이지">{page}</MypageLayout>;
// };
