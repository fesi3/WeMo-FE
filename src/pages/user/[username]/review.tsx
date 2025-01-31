import ReviewCard from '@/components/mypage/ReviewCard';
import { useEffect, useState } from 'react';
import ReviewableCard from '@/components/mypage/ReviewableCard';
import NoData from '@/components/mypage/NoData';
import MypageLayout from '@/components/mypage/MypageLayout';
import { ReviewData, ReviewPlanData } from '@/types/mypageType';
import useFetchDataFromKey from '@/hooks/useFetchDataFromKey';

export default function MyReview() {
  const [activeTab, setActiveTab] = useState<'tabLeft' | 'tabRight'>('tabLeft');
  const [page, setPage] = useState(1); // 페이지 상태 추가

  const apiUrl =
    activeTab === 'tabLeft'
      ? `/api/users/reviews?page=${page}`
      : `/api/users/reviews/available?page=${page}`;

  // activeTab이 변경될 때 page를 1로 리셋
  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  const {
    data: reviewData,
    totalPage: reviewTotalPage,
    loading: reviewDataLoading,
    error: reviewDataError,
  } = useFetchDataFromKey<ReviewData[]>(apiUrl, 'reviewList');
  const {
    data: reviewableData,
    totalPage: reviewableTotalPage,
    loading: reviewableDataLoading,
    error: reviewableDataError,
  } = useFetchDataFromKey<ReviewPlanData[]>(apiUrl, 'planList');

  console.log('리뷰', reviewData);
  console.log('리뷰가능', reviewableData);

  // 로딩 및 오류 처리
  if (reviewDataLoading || reviewableDataLoading) {
    return <div>Loading...</div>;
  }

  if (reviewDataError || reviewableDataError) {
    return <div>Error: {reviewDataError || reviewableDataError}</div>;
  }

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
      page={page}
      totalPage={
        activeTab === 'tabLeft' ? reviewTotalPage : reviewableTotalPage
      }
      onPageChange={setPage}
    >
      {/* activeTab에 따라 다른 컴포넌트 렌더링 */}
      {activeTab === 'tabLeft' ? (
        <section className="flex flex-col sm:w-[500px] md:w-[650px] lg:w-[850px]">
          {reviewData && reviewData.length > 0 ? (
            <ul className="flex flex-col gap-8">
              {reviewData.map((review) => (
                <li key={review.reviewId}>
                  <ReviewCard reviewed={review} />
                  <div className="mt-10 border"></div>
                </li>
              ))}
            </ul>
          ) : (
            <NoData comment="작성한 리뷰가" />
          )}
        </section>
      ) : (
        <section className="flex flex-col sm:w-[500px] md:w-[650px] lg:w-[850px]">
          {reviewableData && reviewableData.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {reviewableData.map((plan) => (
                <li key={plan.planId}>
                  <ReviewableCard reviewable={plan} />
                </li>
              ))}
            </ul>
          ) : (
            <NoData comment="작성 가능한" />
          )}
        </section>
      )}
    </MypageLayout>
  );
}
