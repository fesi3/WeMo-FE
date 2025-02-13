import React, { useEffect, useRef } from 'react';

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
    return <p className="mt-5 text-center">더 이상 리뷰가 없어요 ㅠㅠ</p>;
  if (isLoading) return <p className="text-center">로딩 중...</p>;

  return <div ref={loaderRef} className="h-8" />;
};

export default Loader;
