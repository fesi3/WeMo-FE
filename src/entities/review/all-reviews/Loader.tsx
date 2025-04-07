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
    return (
      <p className="m-6 text-center text-gray-700">
        {'모든 리뷰를 불러왔어요!'}
      </p>
    );
  if (isLoading) return <p className="text-center text-gray-700">로딩 중...</p>;

  return <div ref={loaderRef} className="h-8" />;
};

export default Loader;
