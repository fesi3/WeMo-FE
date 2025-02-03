import { useInfiniteQuery } from '@tanstack/react-query';
import fetchReviews from '@/api/reviews';
import { FilterState } from '@/types/reviewType';

export const useReviews = (category: string, filters: FilterState) => {
  return useInfiniteQuery({
    queryKey: ['reviews', category, filters],
    queryFn: ({ pageParam = 1 }) => {
      // console.log('실행됨');
      return fetchReviews(category, filters, pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage || undefined,
    enabled: !!category, // 카테고리가 존재할 때만 쿼리 실행??
  });
};

export default useReviews;
