import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import FilterBar from '@/components/shared/FilterBar';
import ReviewList from '@/components/all-reviews/ReviewList';
import Tabs from '@/components/findGatherings/tab/Tabs';
import { filterReviews } from '@/utils/filterReviews';
import { Review, FilterState } from '@/types/reviewType';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const ReviewPage = ({ initialReviews }: { initialReviews: Review[] }) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews || []);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(
    initialReviews || [],
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState(1);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 필터 상태
  const [filters, setFilters] = useState<FilterState>({
    region: null,
    subRegion: null,
    date: null,
    sort: null,
  });

  // 탭 상태
  const [selectedCategory, setSelectedCategory] = useState<string>('달램핏');

  /**
   * 서버에서 데이터를 가져오는 함수
   */
  const fetchReviews = async (isAppending = false) => {
    if (!hasMore || loading) return;
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
        categoryId: selectedCategory === '달램핏' ? 1 : 2,
        sort: filters.sort?.name || undefined,
      };

      const { data } = await axios.get(`${BASE_URL}/api/reviews`, { params });

      const newReviews = data.data.reviewList || [];
      setReviews((prev) =>
        isAppending ? [...prev, ...newReviews] : newReviews,
      );

      if (newReviews.length < 5) setHasMore(false);
      else setCursor((prev) => prev + 1);
    } catch (error) {
      console.error('데이터 패칭 오류:', error);
    } finally {
      setLoading(false);
    }
  };

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
    observerRef.current = observer;

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [cursor, hasMore, loading, filters, selectedCategory]);

  // 필터 변경 시 데이터 초기화
  useEffect(() => {
    setReviews([]);
    setCursor(1);
    setHasMore(true);
    fetchReviews(false);
  }, [filters, selectedCategory]);

  // 필터링 적용
  useEffect(() => {
    setFilteredReviews(filterReviews(reviews, filters));
  }, [filters, reviews]);

  return (
    <div className="mx-auto max-w-md px-4 py-6">
      <Tabs
        tabs={[{ category: '달램핏' }, { category: '워케이션' }]}
        defaultTab="달램핏"
        onTabChange={(category) => {
          if (selectedCategory !== category) {
            setSelectedCategory(category);
          }
        }}
        renderContent={() => (
          <>
            <FilterBar
              filters={filters}
              onFilterChange={setFilters}
              sortOptions={[
                { id: 1, name: '참여자 많은순' },
                { id: 2, name: '참여자 적은순' },
              ]}
            />
            <ReviewList reviews={filteredReviews || []} />
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
    const { data } = await axios.get(`${BASE_URL}/api/reviews`, {
      params: { page: 1, size: 5, categoryId: 1 }, // 기본 탭: 달램핏
    });

    return {
      props: {
        initialReviews: data.data.reviewList || [],
      },
      revalidate: 60,
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
