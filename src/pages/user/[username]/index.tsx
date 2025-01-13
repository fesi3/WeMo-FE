import ProfileCard, { User } from '@/components/mypage/ProfileCard';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import arrow from '@/assets/icons/arrow.png';
// import axios from 'axios';
import profileImg from '@/assets/images/profile.png'; // 이미지 경로를 import

export default function MyPage() {
  const [userData, setUserData] = useState<User | null>(null);

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
      nickname: '위모위모',
      companyName: '코드잇',
      profileImagePath: profileImg,
      myPlan: 5,
      myMeeting: 3,
      myReview: 10,
    };

    setUserData(tempUser);
  }, []);

  return (
    <>
      <header className="bg-antiquewhite flex h-12 items-center justify-center bg-gray-100">
        마이페이지
      </header>

      <main className="flex flex-col gap-7 p-4">
        <ProfileCard user={userData} />
        <ul className="flex flex-col gap-4">
          <li className="flex items-center gap-2 border-b border-gray-200 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xl">
              📆
            </div>
            <h2 className="flex-1 text-sm font-medium">나의 일정</h2>
            <Link href={`/user/${userData?.nickname}/plan`}>
              {' '}
              <button>
                <Image src={arrow} alt="arrow" width={6} height={12} />
              </button>
            </Link>
          </li>
          <li className="flex items-center gap-2 border-b border-gray-200 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xl">
              💑
            </div>
            <h2 className="flex-1 text-sm font-medium">나의 모임</h2>
            <Link href={`/user/${userData?.nickname}/meeting`}>
              {' '}
              <button>
                <Image src={arrow} alt="arrow" width={6} height={12} />
              </button>
            </Link>
          </li>
          <li className="flex items-center gap-2 border-b border-gray-200 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xl">
              ⭐
            </div>
            <h2 className="flex-1 text-sm font-medium">나의 리뷰</h2>
            <Link href={`/user/${userData?.nickname}/review`}>
              {' '}
              <button>
                <Image src={arrow} alt="arrow" width={6} height={12} />
              </button>
            </Link>
          </li>
        </ul>
      </main>
      <footer className="fixed bottom-0 left-0 z-50 flex h-12 w-full items-center justify-center border-t border-gray-300 bg-gray-100">
        nav 자리
      </footer>
    </>
  );
}
