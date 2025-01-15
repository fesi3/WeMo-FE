import Button from '@/components/shared/Button';
import ReviewCard from '@/components/mypage/ReviewCard';
import { useEffect, useState } from 'react';
import ReviewableCard from '@/components/mypage/ReviewableCard';
import axios from 'axios';
import { StaticImageData } from 'next/image';

const BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

export interface ReviewData {
  reviewId: number; // 리뷰 상세로 이동

  planName: string;
  dateTime: string;
  category: string;
  address: string;
  score: number;
  comment: string;
  reivewImagePath: string | StaticImageData;

  planId: number; // 일정 상세로 이동
}

export interface ReviewPlanData {
  planId: number;
  planName: string;
  dateTime: string;
  category: string;
  address: string;
  planImagePath: string | StaticImageData;
  capacity: number;
  participants: number;
  createdAt: string;
  updatedAt: string;
}

export default function MyReview() {
  const [activeTab, setActiveTab] = useState<'tabLeft' | 'tabRight' | null>(
    'tabLeft',
  );

  // 데이터 상태
  const [reviewData, setReviewData] = useState<ReviewData[]>([]);
  const [reviewableData, setReviewableData] = useState<ReviewPlanData[]>([]);

  // 탭 클릭 시 상태 변경
  const handleButtonClick = (newTab: 'tabLeft' | 'tabRight') => {
    if (activeTab === newTab) {
      return; // 이미 활성화된 탭을 다시 클릭하면 아무 일도 일어나지 않음
    }
    setActiveTab(newTab);
  };
  console.log('클릭', activeTab);

  useEffect(() => {
    const fetchData = async () => {
      if (!setActiveTab) return;

      const apiUrl =
        activeTab === 'tabLeft'
          ? `${BASE_URL}/my_review`
          : `${BASE_URL}/my_reviewable`;

      try {
        const response = await axios.get(apiUrl);

        const userReviewableData = response.data.data.planList;
        const userReviewableCount = response.data.data.planCount;
        const userReviewData = response.data.data.reviewList;
        const userReviewCount = response.data.data.reviewCount;

        console.log('(api응답)리뷰수', userReviewCount, userReviewData);
        console.log(
          '(api응답)일정 수',
          userReviewableCount,
          userReviewableData,
        );

        // activeTab에 따라서 데이터 처리
        if (activeTab === 'tabLeft') {
          setReviewData(userReviewData);
        } else {
          // tabRight 일 때 (reviewableData가 존재할 때만 업데이트)
          if (userReviewableData && userReviewableData.length > 0) {
            setReviewableData(userReviewableData);
          } else {
            setReviewableData([]); // 없으면 빈 배열로
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [activeTab]);

  console.log('업데이트 된 리뷰 ', reviewData);
  console.log('업데이트 된 리뷰가능 목록 ', reviewableData);

  return (
    <>
      <header className="bg-antiquewhite flex h-12 items-center justify-center bg-gray-100">
        나의 리뷰
      </header>

      <main className="flex flex-col px-4">
        <section className="flex h-[64px] w-full items-center justify-center">
          {' '}
          <Button
            type="tabLeft"
            text="작성한 리뷰"
            isActive={activeTab === 'tabLeft'}
            onClick={() => handleButtonClick('tabLeft')}
          />
          <Button
            type="tabRight"
            text="작성할 리뷰"
            isActive={activeTab === 'tabRight'}
            onClick={() => handleButtonClick('tabRight')}
          />{' '}
        </section>

        {/* activeTab에 따라 다른 컴포넌트 렌더링 */}
        {activeTab === 'tabLeft' ? (
          <section className="flex flex-col">
            <ul>
              {reviewData.map((review) => (
                <li key={review.reviewId}>
                  <ReviewCard reviewed={review} />
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <section className="flex flex-col">
            <ul>
              {reviewableData.map((plan) => (
                <li key={plan.planId}>
                  <ReviewableCard reviewable={plan} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 z-50 flex h-12 w-full items-center justify-center border-t border-gray-300 bg-gray-100">
        nav 자리
      </footer>
    </>
  );
}

// MyReview.getLayout = (page: ReactNode) => {
//   return <MypageLayout headerProps="나의 리뷰">{page}</MypageLayout>;
// };
