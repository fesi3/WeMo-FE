import React, { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import FilterBar from '@/components/shared/FilterBar';
import ReviewList from '@/components/all-reviews/ReviewList';
import Tabs from '@/components/findGatherings/tab/Tabs';
import { Review, FilterState, SortOption } from '@/types/reviewType';
// import { useQuery } from '@tanstack/react-query';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const ReviewPage = ({
  initialDalRampitReviews,
  initialWorkationReviews,
}: {
  initialDalRampitReviews: Review[];
  initialWorkationReviews: Review[];
}) => {
  const [reviews, setReviews] = useState<Review[]>(
    initialDalRampitReviews || [],
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState(1);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // 필터 및 탭 상태
  const [filters, setFilters] = useState<FilterState>({
    region: null,
    subRegion: null,
    date: null,
    sort: null,
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('달램핏');
  const sortOptions: SortOption[] = [
    { id: 1, name: '평점 높은 순', value: 'ratingOrder' },
    // { id: 2, name: '평점 낮은 순', value: 'lowRatingOrder' },
  ];

  // 서버에서 데이터를 가져오는 함수
  const fetchReviews = useCallback(
    async (isAppending = false) => {
      console.log(!hasMore, loading);
      if (!hasMore || loading) return;

      try {
        setLoading(true);

        const params = {
          page: isAppending ? cursor : 1,
          size: 5,
          province: filters.region?.name || undefined,
          district: filters.subRegion?.name || undefined,
          startDate: filters.date
            ? filters.date.toISOString().split('T')[0]
            : undefined,
          endDate: filters.date
            ? filters.date.toISOString().split('T')[0]
            : undefined,
          categoryId: selectedCategory === '달램핏' ? 1 : 2,
          sort: filters.sort?.value || undefined,
        };

        console.log('요청 데이터:', params);

        const { data } = await axios.get(`${BASE_URL}/api/reviews`, { params });
        console.log('이 데이터 임요', data);
        const newReviews = data.data.reviewList || [];
        // console.log('서버 응답 데이터:', newReviews);

        setReviews((prevReviews) =>
          isAppending ? [...prevReviews, ...newReviews] : newReviews,
        );

        if (newReviews.length < 5) setHasMore(false);
        if (isAppending) setCursor((prev) => prev + 1);
      } catch (error) {
        console.error('데이터 요청 오류:', error);
      } finally {
        setLoading(false);
      }
    },
    [filters, cursor, hasMore, loading, selectedCategory],
  );

  // IntersectionObserver 설정
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        fetchReviews(true);
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

    return () => {
      observer.disconnect();
    };
  }, [cursor, hasMore, filters, selectedCategory]);

  // 탭 전환 시 초기화
  useEffect(() => {
    setCursor(1);
    setHasMore(true);

    if (selectedCategory === '달램핏') {
      setReviews(initialDalRampitReviews);
    } else {
      setReviews(initialWorkationReviews);
    }
  }, [selectedCategory]);

  // 필터 변경 시 요청
  useEffect(() => {
    console.log('현재 필터 상태:', filters);
    fetchReviews(false); // 새로운 데이터 요청
  }, [filters.region, filters.subRegion, filters.sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <Tabs
        tabs={[{ category: '달램핏' }, { category: '워케이션' }]}
        defaultTab="달램핏"
        onTabChange={(category) => {
          setSelectedCategory(category); // 탭 변경
          setFilters({
            region: null,
            subRegion: null,
            date: null,
            sort: null,
          }); // 필터 초기화
        }}
        renderContent={() => (
          <>
            <FilterBar
              filters={filters}
              onFilterChange={(newFilters) => {
                // console.log('필터 변경 요청:', newFilters); // 필터 변경 요청 로그
                setHasMore(true);
                setFilters((prevFilters) => {
                  const updatedFilters = { ...prevFilters, ...newFilters };
                  // console.log('업데이트된 필터 상태:', updatedFilters); // 상태 업데이트 로그
                  return updatedFilters;
                });
              }}
              sortOptions={sortOptions}
            />
            <div className="mt-4">
              <ReviewList reviews={reviews} />
            </div>

            <div ref={loaderRef} className="h-8" />
            {loading && <p className="text-center">로딩 중...</p>}
            {!hasMore && (
              <p className="text-center">더 이상 데이터가 없습니다.</p>
            )}
          </>
        )}
      />
    </div>
  );
};

// ISR을 이용한 초기 데이터 패칭
export const getStaticProps = async () => {
  try {
    const [dalRampitRes, workationRes] = await Promise.all([
      axios.get(`${BASE_URL}/api/reviews`, {
        params: { page: 1, size: 5, categoryId: 1 },
      }),
      axios.get(`${BASE_URL}/api/reviews`, {
        params: { page: 1, size: 5, categoryId: 2 },
      }),
    ]);

    return {
      props: {
        initialDalRampitReviews: dalRampitRes.data.data.reviewList || [],
        initialWorkationReviews: workationRes.data.data.reviewList || [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('초기 데이터 패칭 오류:', error);
    return {
      props: {
        initialDalRampitReviews: [],
        initialWorkationReviews: [],
      },
    };
  }
};

export default ReviewPage;
