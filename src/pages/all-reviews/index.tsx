import React, { useEffect, useRef, useState } from 'react';
import FilterBar from '@/components/shared/FilterBar';
import ReviewList from '@/components/all-reviews/ReviewList';
import Tabs from '@/components/findGatherings/tab/Tabs';
import { Review, FilterState } from '@/types/reviewType';
import axiosInstance from '@/api/axiosInstance';
import { useInfiniteQuery } from '@tanstack/react-query';

const CATEGORIES = [{ category: '달램핏' }, { category: '워케이션' }];
const DEFAULT_CATEGORY = CATEGORIES[0].category;

const fetchReviews = async (
  category: string,
  filters: FilterState,
  pageParam: number = 1,
): Promise<{ reviews: Review[]; nextPage?: number }> => {
  const params = {
    page: pageParam,
    size: 5,
    province: filters.region?.name || undefined,
    district: filters.subRegion?.name || undefined,
    startDate: filters.date
      ? filters.date.toISOString().split('T')[0]
      : undefined,
    endDate: filters.date
      ? filters.date.toISOString().split('T')[0]
      : undefined,
    categoryId: category === '달램핏' ? 1 : 2,
    sort: filters.sort?.value || undefined,
  };

  const { data } = await axiosInstance.get('/api/reviews', { params });
  return {
    reviews: data.data.reviewList || [],
    nextPage: pageParam < data.data.totalPage ? pageParam + 1 : undefined,
  };
};

const ReviewPage = ({
  initialDalRampitReviews,
  initialWorkationReviews,
}: {
  initialDalRampitReviews: Review[];
  initialWorkationReviews: Review[];
}) => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <Tabs
        tabs={CATEGORIES}
        defaultTab={DEFAULT_CATEGORY}
        renderContent={(category) => (
          <ReviewContainer
            category={category}
            initialReviews={
              category === '달램핏'
                ? initialDalRampitReviews
                : initialWorkationReviews
            }
          />
        )}
      />
    </div>
  );
};

const ReviewContainer = ({
  category,
}: {
  category: string;
  initialReviews: Review[];
}) => {
  const [filters, setFilters] = useState<FilterState>({
    region: null,
    subRegion: null,
    date: null,
    sort: null,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['reviews', category, filters],
      queryFn: ({ pageParam = 1 }) =>
        fetchReviews(category, filters, pageParam),
      initialPageParam: 1, // 초기 페이지는 1으로 설정
      getNextPageParam: (lastPage) => lastPage.nextPage || undefined, // nextPage 계산
    });

  const reviews = data?.pages.flatMap((page) => page.reviews) || [];

  return (
    <>
      <FilterBar
        filters={filters}
        onFilterChange={(newFilters) =>
          setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }))
        }
        sortOptions={[{ id: 1, name: '평점 높은 순', value: 'ratingOrder' }]}
      />
      <div className="mt-4">
        <ReviewList reviews={reviews} />
      </div>
      <Loader
        isLoading={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </>
  );
};

const Loader = ({
  isLoading,
  hasNextPage,
  fetchNextPage,
}: {
  isLoading: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
}) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage) fetchNextPage();
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
    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (!hasNextPage)
    return <p className="text-center">더 이상 데이터가 없습니다.</p>;
  if (isLoading) return <p className="text-center">로딩 중...</p>;

  return <div ref={loaderRef} className="h-8" />;
};

export const getStaticProps = async () => {
  try {
    const [dalRampitRes, workationRes] = await Promise.all([
      axiosInstance.get(`/api/reviews`, {
        params: { page: 1, size: 5, categoryId: 1 },
      }),
      axiosInstance.get(`/api/reviews`, {
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
