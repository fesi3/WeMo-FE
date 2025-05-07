import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useInfiniteQuery } from '@tanstack/react-query';

import { RootState } from '@/shared/lib/redux/store';
import {
  RegionOption,
  SortOption,
  SubRegionOption,
} from '@/shared/types/reviewType';
import { getCategoryId } from '@/shared/utils/categoryUtils';
import { PlanListResponse } from '@/shared/types/plans';
import getPlans from '../api/getPlans';
import { PlanInfiniteQueryResponseType } from './type';

interface UseCursorInfiniteScrollProps {
  selectedCategory: string | null;
  selectedSubCategory: string | null;
  selectedRegion: RegionOption | null;
  selectedSubRegion: SubRegionOption | null;
  selectedSort: SortOption | null;
}

export const useCursorInfiniteScroll = ({
  selectedCategory,
  selectedSort,
}: UseCursorInfiniteScrollProps) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const sortParam = selectedSort ? `${selectedSort.value}` : '';
  const categoryParam = getCategoryId(selectedCategory || '');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<
      PlanListResponse,
      Error,
      PlanInfiniteQueryResponseType,
      (string | { sortParam: string; categoryParam: number })[],
      number | null
    >({
      queryKey: ['plans', { sortParam, categoryParam }],
      queryFn: ({ pageParam }) =>
        getPlans({
          pageParam,
          sortParam,
          categoryParam,
          isLoggedIn,
        }),
      initialPageParam: null,
      getNextPageParam: (lastPage) => {
        if (lastPage.data.nextCursor === null) {
          if (observerRef.current) {
            observerRef.current.disconnect();
          }
        }

        return lastPage.data.nextCursor ?? null;
      },
    });

  /**
   * IntersectionObserver 콜백 함수
   * - isFetching이 true이면 중복 요청 방지
   * - requestedCursors를 이용해 이미 요청한 cursor인지 확인
   */

  const handleObserver = async (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];

    if (target.isIntersecting && !isFetchingNextPage && hasNextPage) {
      try {
        fetchNextPage();
      } catch (error) {
        console.error('추가 데이터 로딩 실패:', error);
      }
    }
  };

  /**
   * IntersectionObserver 등록 및 해제
   */
  useEffect(() => {
    if (!selectedCategory) return;

    if (!hasNextPage) {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      return;
    }

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1.0,
    });

    observerRef.current = observer;
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasNextPage, handleObserver, selectedCategory]);

  return { loaderRef, data, isFetchingNextPage, hasNextPage };
};
