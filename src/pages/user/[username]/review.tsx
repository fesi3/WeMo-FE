// import Button from '@/components/shared/Button';
import ReviewCard from '@/components/mypage/ReviewCard';
import { useEffect, useState } from 'react';
import ReviewableCard from '@/components/mypage/ReviewableCard';
import axios from 'axios';
import { StaticImageData } from 'next/image';
import NoData from '@/components/mypage/NoData';
import MypageLayout from '@/components/mypage/MypageLayout';

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
  planImagePath: string | StaticImageData;
  planId: number; // 일정 상세로 이동
}

export interface ReviewPlanData {
  planId: number;
  planName: string;
  dateTime: string;
  category: string;
  address: string;
  planImagePath: string | StaticImageData;
}

export default function MyReview() {
  const [activeTab, setActiveTab] = useState<'tabLeft' | 'tabRight'>('tabLeft');

  // 데이터 상태
  const [reviewData, setReviewData] = useState<ReviewData[]>([]);
  const [reviewableData, setReviewableData] = useState<ReviewPlanData[]>([]);

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
    <MypageLayout
      headerProps="리뷰 페이지"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabsTitle={[
        // 동적으로 tabs 설정
        { key: 'tabLeft', label: '작성한 리뷰' },
        { key: 'tabRight', label: '작성 가능한 리뷰' },
      ]}
    >
      {/* activeTab에 따라 다른 컴포넌트 렌더링 */}
      {activeTab === 'tabLeft' ? (
        <section className="flex flex-col sm:w-[500px] md:w-[650px] lg:w-[850px]">
          {reviewData.length > 0 ? (
            <ul className="flex flex-col gap-8">
              {reviewData.map((review) => (
                <>
                  <li key={review.reviewId}>
                    <ReviewCard reviewed={review} />
                  </li>
                  <div className="border"></div>
                </>
              ))}
            </ul>
          ) : (
            <NoData comment="작성한 리뷰가" />
          )}
        </section>
      ) : (
        <section className="flex flex-col sm:w-[500px] md:w-[650px] lg:w-[850px]">
          {reviewableData.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {reviewableData.map((plan) => (
                <li key={plan.planId}>
                  <ReviewableCard reviewable={plan} />
                </li>
              ))}
            </ul>
          ) : (
            <NoData comment="작성할 리뷰가" />
          )}
        </section>
      )}
    </MypageLayout>
  );
}
