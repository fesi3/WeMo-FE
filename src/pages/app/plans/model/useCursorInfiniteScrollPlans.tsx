import { useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/shared/lib/redux/store';
import {
  RegionOption,
  SortOption,
  SubRegionOption,
} from '@/shared/types/reviewType';
import { PlanDataWithCategory } from '@/shared/types/plans';
import { getCategoryId } from '@/shared/utils/categoryUtils';
import getPlans from '../api/getPlans';

interface UseCursorInfiniteScrollProps {
  cursor: number | null | undefined;
  setCursor: (cursor: number | null | undefined) => void;
  isFetching: boolean;
  setIsFetching: (fetching: boolean) => void;
  selectedCategory: string | null;
  selectedSubCategory: string | null;
  selectedRegion: RegionOption | null;
  selectedSubRegion: SubRegionOption | null;
  selectedSort: SortOption | null;
  onDataFetched: (newData: PlanDataWithCategory[]) => void;
}

export const useCursorInfiniteScroll = ({
  cursor,
  setCursor,
  isFetching,
  setIsFetching,
  selectedCategory,
  selectedSubCategory,
  selectedSort,
  onDataFetched,
}: UseCursorInfiniteScrollProps) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 요청한 cursor를 저장하여 중복 요청 방지
  const requestedCursors = useRef(new Set<number | null | undefined>());

  /**
   * IntersectionObserver 콜백 함수
   * - isFetching이 true이면 중복 요청 방지
   * - requestedCursors를 이용해 이미 요청한 cursor인지 확인
   */
  const handleObserver = useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];

      if (target.isIntersecting && !isFetching && cursor) {
        // 이미 요청한 cursor인지 확인하여 중복 요청 방지
        if (requestedCursors.current.has(cursor)) return;

        setIsFetching(true);
        requestedCursors.current.add(cursor); // 요청한 cursor 저장

        try {
          const sortParam = selectedSort ? `${selectedSort.value}` : '';
          const categoryParam = getCategoryId(selectedCategory || '');
          const cursorParam = cursor ? `${cursor}` : '';

          const { data: planData } = await getPlans({
            isLoggedIn,
            sortParam,
            categoryParam,
            cursorParam,
          });

          const formatted = planData.planList as PlanDataWithCategory[];
          onDataFetched(formatted);

          if (planData.nextCursor === null || formatted.length === 0) {
            setCursor(null);
            if (observerRef.current) {
              observerRef.current.disconnect();
            }
          } else {
            setCursor(planData.nextCursor);
          }
        } catch (error) {
          console.error('추가 데이터 로딩 실패:', error);
        } finally {
          setIsFetching(false);
        }
      }
    },
    [
      cursor,
      isFetching,
      selectedCategory,
      selectedSort,
      setCursor,
      setIsFetching,
      onDataFetched,
      isLoggedIn,
    ],
  );

  /**
   * IntersectionObserver 등록 및 해제
   */
  useEffect(() => {
    if (!selectedCategory) return;
    if (cursor === null) {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      return;
    }

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
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
  }, [handleObserver, selectedCategory]);

  /**
   * 정렬 필터 변경 시 requestedCursors 초기화
   */
  useEffect(() => {
    if (selectedSort) {
      requestedCursors.current.clear();
    }
  }, [selectedSort]);

  /**
   * 카테고리 변경 시 requestedCursors 초기화
   */
  useEffect(() => {
    if (selectedCategory || selectedSubCategory) {
      requestedCursors.current.clear();
    }
  }, [selectedCategory, selectedSubCategory]);

  return { loaderRef };
};
