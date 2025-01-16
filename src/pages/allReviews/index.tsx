import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FilterBar from '@/components/shared/FilterBar';
import ReviewList from '@/components/all-reviews/ReviewList';
import { filterReviews } from '@/utils/filterReviews';
import { Review, FilterState } from '@/components/types/reviewType';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const ReviewPage = ({ initialReviews }: { initialReviews: Review[] }) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews || []);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(
    initialReviews || [],
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // 추가 데이터 여부
  const [cursor, setCursor] = useState(1); // 현재 페이지

  const [filters, setFilters] = useState<FilterState>({
    region: null,
    subRegion: null,
    date: null,
    sort: null,
  });

  /**
   * 서버에서 데이터를 가져오는 함수
   * @param {number} page - 현재 페이지 번호
   * @param {boolean} isAppending - 기존 데이터에 추가 여부
   */

  const fetchReviews = async (page: number, isAppending = false) => {
    try {
      setLoading(true);

      // API 요청 파라미터 생성
      const params = {
        page,
        size: 5,
        province: filters.region?.name || undefined,
        district: filters.subRegion?.name || undefined,
        startDate: filters.date
          ? filters.date.toISOString().split('T')[0]
          : undefined,
        endDate: filters.date
          ? filters.date.toISOString().split('T')[0]
          : undefined,
        categoryId: null, // 필요에 따라 변경
        sort: filters.sort?.name || undefined,
      };

      const { data } = await axios.get(`${BASE_URL}/api/reviews`, { params });

      // 응답 데이터 처리
      if (isAppending) {
        setReviews((prev) => [...prev, ...(data.data.reviewList || [])]);
        if (data.data.reviewList.length < 5) setHasMore(false); // 더 이상 데이터 없음
      } else {
        setReviews(data.data.reviewList || []);
        setHasMore(data.data.reviewList.length === 5); // 5개 미만이면 데이터 없음
      }
    } catch (error) {
      console.error('데이터 패칭 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  // 필터 변경 시 데이터 다시 가져오기
  useEffect(() => {
    fetchReviews(1); // 첫 페이지 데이터
    setCursor(2); // 다음 페이지 초기화
  }, [filters]);

  // 필터링 적용
  useEffect(() => {
    setFilteredReviews(filterReviews(reviews, filters));
  }, [filters, reviews]);

  // 더 가져오기 (커서 기반)
  const loadMore = () => {
    if (!hasMore || loading) return;
    fetchReviews(cursor, true);
    setCursor((prev) => prev + 1);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-4">
      <h1 className="text-center text-2xl font-bold">리뷰 페이지</h1>
      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        sortOptions={[
          { id: 1, name: '참여자 많은순' },
          { id: 2, name: '참여자 적은순' },
        ]}
      />
      <ReviewList reviews={filteredReviews || []} />
      {hasMore && (
        <button
          onClick={loadMore}
          disabled={loading}
          className="block w-full rounded bg-blue-500 px-4 py-2 text-white"
        >
          {loading ? '로딩 중...' : '더 보기'}
        </button>
      )}
    </div>
  );
};

// ISR을 이용한 초기 데이터 패칭
export const getStaticProps = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/reviews`, {
      params: { page: 1, size: 5 },
    });
    return {
      props: {
        initialReviews: data.data.reviewList || [],
      },
      revalidate: 60, // 60초마다 재생성
    };
  } catch (error) {
    console.error('초기 데이터 패칭 오류:', error);
    return {
      props: {
        initialReviews: [],
      },
    };
  }
};

export default ReviewPage;
