import { useState, useEffect, useRef } from 'react';

interface UsePageInfiniteScrollOptions {
  fetchMore: (page: number) => Promise<boolean>; // 페이지를 로드하는 함수, true/false 반환
  initialPage?: number; // 초기 페이지
  onPageLoadComplete?: (dataAvailable: boolean) => void; // 페이지 로드 후 콜백
}

export const usePageInfiniteScroll = ({
  fetchMore,
  initialPage = 1,
  onPageLoadComplete,
}: UsePageInfiniteScrollOptions) => {
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          const dataAvailable = await fetchMore(page); // fetchMore 호출
          if (dataAvailable) {
            setPage((prevPage) => prevPage + 1); // 페이지 증가
          } else {
            setHasMore(false); // 더 이상 데이터가 없으면 중단
          }
          if (onPageLoadComplete) {
            onPageLoadComplete(dataAvailable);
          }
        }
      },
      { threshold: 1.0 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [fetchMore, hasMore, page, onPageLoadComplete]);

  return { loaderRef, hasMore };
};
