import { useInfiniteQuery } from '@tanstack/react-query';
import fetchReviews from '@/api/reviews';
import { Review, FilterState } from '@/types/reviewType';

export const useReviews = (
  category: string,
  filters: FilterState,
  initialReviews: Review[],
) => {
  return useInfiniteQuery({
    queryKey: ['reviews', category, filters],
    queryFn: ({ pageParam = 1 }) => fetchReviews(category, filters, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage || undefined,

    //필터가 초기 상태일때만 초기 데이터 가져오기
    initialData:
      filters.region || filters.subRegion || filters.sort
        ? undefined // 필터 변경 시, 새로운 데이터 가져오기
        : {
            pages: [{ reviews: initialReviews, nextPage: 2 }],
            pageParams: [1],
          },

    enabled: !!category, // 카테고리가 존재할 때만 쿼리 실행??
  });
};

export default useReviews;
