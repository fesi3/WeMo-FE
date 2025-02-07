import ReviewCard from '@/components/mypage/ReviewCard';
import { useEffect, useState } from 'react';
import ReviewableCard from '@/components/mypage/ReviewableCard';
import NoData from '@/components/mypage/NoData';
import MypageLayout from '@/components/mypage/MypageLayout';
import { ReviewableDataResponse, ReviewDataResponse } from '@/types/mypageType';
import instance from '@/api/axiosInstance';
import { useQuery } from '@tanstack/react-query';

// 마이페이지 리뷰 데이터 가져오는 함수
const fetchMypageReviews = async (url: string) => {
  const response = await instance<ReviewDataResponse>(url);
  return response.data;
};

// 마이페이지 리뷰 가능한 데이터 가져오는 함수
const fetchMypageReviewables = async (url: string) => {
  const response = await instance<ReviewableDataResponse>(url);
  return response.data;
};

// 리뷰 데이터를 가져오는 커스텀 훅
const useMypageReviews = (apiUrl: string, page: number, enabled: boolean) => {
  return useQuery({
    queryKey: ['reviewedList', page],
    queryFn: () => fetchMypageReviews(apiUrl),
    staleTime: 100 * 1000, // 10초
    enabled,
  });
};

// 리뷰 가능한 데이터를 가져오는 커스텀 훅
const useMypageReviewables = (
  apiUrl: string,
  page: number,
  enabled: boolean,
) => {
  return useQuery({
    queryKey: ['reviewableList', page],
    queryFn: () => fetchMypageReviewables(apiUrl),
    staleTime: 100 * 1000, // 10초
    enabled,
  });
};

export default function MyReview() {
  const [activeTab, setActiveTab] = useState<'tabLeft' | 'tabRight'>('tabLeft');
  const [page, setPage] = useState(1); // 페이지 상태 추가

  const reviewApiUrl = `/api/users/reviews?page=${page}`;
  const reviewableApiUrl = `/api/users/reviews/available?page=${page}`;

  // activeTab이 변경될 때 page를 1로 리셋
  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  const {
    data: reviewed,
    isLoading: reviewDataLoading,
    error: reviewDataError,
  } = useMypageReviews(reviewApiUrl, page, activeTab === 'tabLeft');
  const {
    data: reviewable,
    isLoading: reviewableDataLoading,
    error: reviewableDataError,
  } = useMypageReviewables(reviewableApiUrl, page, activeTab === 'tabRight');

  const reviewData = reviewed?.data.reviewList;
  const reviewableData = reviewable?.data.planList;

  //로딩 및 에러 처리
  if (activeTab === 'tabLeft') {
    if (reviewDataLoading) return <div>작성한 리뷰 로딩 중...</div>;
    if (reviewDataError) return <div>Error: {reviewDataError.message} </div>;
  }

  if (activeTab === 'tabRight') {
    if (reviewableDataLoading) return <div>작성가능한 리뷰 로딩 중...</div>;
    if (reviewableDataError)
      return <div>Error: {reviewableDataError.message} </div>;
  }

  const reviewTotalPage = reviewed?.data.totalPage;
  const reviewableTotalPage = reviewable?.data.totalPage;

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
        activeTab === 'tabLeft'
          ? reviewTotalPage
            ? reviewTotalPage
            : 0
          : reviewableTotalPage
            ? reviewableTotalPage
            : 0
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
            <NoData comment="작성 가능한 리뷰가" />
          )}
        </section>
      )}
    </MypageLayout>
  );
}
