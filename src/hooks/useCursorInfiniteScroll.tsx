import { useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { RegionOption, SortOption, SubRegionOption } from '@/types/reviewType';
import { PlanDataWithCategory } from '@/types/plans';
import { getCategoryId } from '@/utils/categoryUtils';

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
  //selectedRegion,
  //selectedSubRegion,
  selectedSort,
  onDataFetched,
}: UseCursorInfiniteScrollProps) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
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

      if (target.isIntersecting && !isFetching && cursor !== null) {
        // 이미 요청한 cursor인지 확인하여 중복 요청 방지
        if (requestedCursors.current.has(cursor)) return;

        setIsFetching(true);
        requestedCursors.current.add(cursor); // 요청한 cursor 저장

        try {
          const categoryParam = getCategoryId(selectedCategory || '');
          const sortParam = selectedSort ? `&sort=${selectedSort.value}` : '';

          let url = `${baseUrl}/api/plans?size=10&categoryId=${categoryParam}${sortParam}`;
          if (cursor !== undefined) {
            url += `&cursor=${cursor}`;
          }

          const res = await axios.get(url);
          const newData = res.data;
          const formatted = newData.data.planList as PlanDataWithCategory[];
          onDataFetched(formatted);

          //console.log('응답 plan IDs:', formatted.map(plan => plan.planId));
          //console.log('응답 nextCursor:', newData.data.nextCursor);

          if (newData.data.nextCursor === null || formatted.length === 0) {
            setCursor(null);
            if (observerRef.current) {
              observerRef.current.disconnect();
            }
          } else {
            setCursor(newData.data.nextCursor);
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
    ],
  );

  /**
   * IntersectionObserver 등록 및 해제
   * - handleObserver를 트리거할 IntersectionObserver를 등록
   * - cleanup 함수에서 옵저버 해제
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
  }, [handleObserver, cursor, selectedCategory]);

  //정렬 필터 변경 시 requestedCursors 초기화
  useEffect(() => {
    if (selectedSort) {
      requestedCursors.current.clear(); // 기존 요청된 cursor 초기화
    }
  }, [selectedSort]);

  //카테고리 변경 시 requestedCursors 초기화
  useEffect(() => {
    if (selectedCategory || selectedSubCategory) {
      requestedCursors.current.clear();
    }
  }, [selectedCategory, selectedSubCategory]);

  return { loaderRef };
};
