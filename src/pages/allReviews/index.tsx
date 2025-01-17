import React, { useEffect, useRef, useState } from 'react';
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
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    region: null,
    subRegion: null,
    date: null,
    sort: null,
  });

  /**
   * 서버에서 데이터를 가져오는 함수
   * @param {boolean} isAppending - 기존 데이터에 추가 여부
   */
  const fetchReviews = async (isAppending = false) => {
    if (!hasMore || loading) return; // 데이터가 없거나 로딩 중일 때 중단
    try {
      setLoading(true);

      const params = {
        page: cursor,
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

      const newReviews = data.data.reviewList || [];
      setReviews((prev) =>
        isAppending ? [...prev, ...newReviews] : newReviews,
      );

      // 더 이상 데이터가 없으면 `hasMore`를 false로 설정
      if (newReviews.length < 5) setHasMore(false);
      else setCursor((prev) => prev + 1);
    } catch (error) {
      console.error('데이터 패칭 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  // IntersectionObserver를 설정
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        fetchReviews(true); // 추가 데이터 로드
      }
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [cursor, hasMore, loading, filters]);

  // 필터 변경 시 데이터 초기화
  useEffect(() => {
    setReviews([]); // 기존 데이터 초기화
    setCursor(1); // 첫 페이지부터 다시 로드
    setHasMore(true); // 데이터 로드 가능 상태로 초기화
    fetchReviews(false); // 첫 데이터 로드
  }, [filters]);

  // 필터링 적용
  useEffect(() => {
    setFilteredReviews(filterReviews(reviews, filters));
  }, [filters, reviews]);

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
      <div ref={loaderRef} className="h-8" /> {/* 무한 스크롤 트리거 */}
      {loading && <p className="text-center">로딩 중...</p>}
      {!hasMore && <p className="text-center">더 이상 데이터가 없습니다.</p>}
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
