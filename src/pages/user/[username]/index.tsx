import ProfileCard, { User } from '@/components/mypage/ProfileCard';
import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import profileImg from '@/assets/images/profile.png'; // 이미지 경로를 import
import IndexNav from '@/components/mypage/IndexNav';

export default function MyPage() {
  const [userData, setUserData] = useState<User | null>(null);
  console.log(userData);
  // //최초 렌더링 시에만 api 호출
  // useEffect(() => {
  //   async function fetchUserData() {
  //     try {
  //       const response = await axios.get(
  //         '', //api 호출 경로

  //         {
  //           headers: {
  //             Authorization: ``, // JWT 토큰
  //           },
  //         },
  //       );
  //       setUserData(response.data.planList);
  //     } catch (error) {
  //       console.error('api 에러', error);
  //     }
  //   }

  //   fetchUserData();
  // }, []);

  useEffect(() => {
    // 임시 데이터
    const tempUser: User = {
      nickname: '지원',
      companyName: '코드잇',
      profileImagePath: profileImg,
      myPlan: 5,
      myMeeting: 3,
      myReview: 10,
    };

    setUserData(tempUser);
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
