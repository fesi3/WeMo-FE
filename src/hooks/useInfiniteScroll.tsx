import { useEffect, useRef } from 'react';
import axios from 'axios';
import { RegionOption, SubRegionOption } from '@/components/types/reviewType';
import { PlanDataWithCategory } from '@/components/types/plans';
import { getCategoryId } from '@/utils/categoryUtils';

interface UseInfiniteScrollProps {
  cursor: number | null;
  setCursor: (cursor: number | null) => void;
  isFetching: boolean;
  setIsFetching: (fetching: boolean) => void;
  selectedSubCategory: string | null;
  selectedRegion: RegionOption | null;
  selectedSubRegion: SubRegionOption | null;
  onDataFetched: (newData: PlanDataWithCategory[]) => void;
}

export const useInfiniteScroll = ({
  cursor,
  setCursor,
  isFetching,
  setIsFetching,
  selectedSubCategory,
  selectedRegion,
  selectedSubRegion,
  onDataFetched,
}: UseInfiniteScrollProps) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !isFetching && cursor !== null) {
          setIsFetching(true);
          try {
            const categoryId = getCategoryId('달램핏', selectedSubCategory);
            const provinceParam =
              selectedRegion && selectedRegion.id > 0
                ? `&province=${selectedRegion.name}`
                : '';
            const districtParam =
              selectedSubRegion && selectedSubRegion.id > 0
                ? `&district=${selectedSubRegion.name}`
                : '';
            const res = await axios.get(
              `${baseUrl}/api/plans?cursor=${cursor}&size=10&categoryId=${categoryId}${provinceParam}${districtParam}`,
            );
            const newData = res.data;
            //API에 맞게 형태 변환
            const formatted = newData.data.planList as PlanDataWithCategory[];
            onDataFetched(formatted);
            setCursor(newData.data.nextCursor);
          } catch (error) {
            console.error('추가 데이터 로딩 실패:', error);
          } finally {
            setIsFetching(false);
          }
        }
      },
      { threshold: 0.1 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [
    cursor,
    isFetching,
    selectedSubCategory,
    selectedRegion,
    selectedSubRegion,
  ]);

  return { loaderRef };
};
