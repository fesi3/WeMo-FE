import { useEffect, useRef } from 'react';
import axios from 'axios';
import { RegionOption, SubRegionOption } from '@/types/reviewType';
import { PlanDataWithCategory } from '@/types/plans';
//import { getCategoryId } from '@/utils/categoryUtils';

interface UseInfiniteScrollProps {
  cursor: number | null;
  setCursor: (cursor: number | null) => void;
  isFetching: boolean;
  setIsFetching: (fetching: boolean) => void;
  selectedCategory: string | null;
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
  selectedCategory,
  selectedSubCategory,
  selectedRegion,
  selectedSubRegion,
  onDataFetched,
}: UseInfiniteScrollProps) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // ref를 통해 observer 인스턴스를 저장하여 필요시 disconnect 가능
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // 이미 데이터 로딩이 끝났으면 observer 해제
    if (cursor === null) {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      return;
    }

    // observer 콜백
    const handleObserver: IntersectionObserverCallback = async (entries) => {
      const target = entries[0];
      // target이 보여지고, API 호출 중이 아니며, cursor 값이 존재하는 경우에만 호출
      if (target.isIntersecting && !isFetching && cursor !== null) {
        setIsFetching(true);
        try {
          // selectedCategory에 따라 categoryId 설정
          const categoryParam =
            selectedCategory === '달램핏'
              ? '1' // 달램핏 데이터 요청
              : '2'; // 워케이션 데이터 요청

          // // 하위 카테고리가 있을 경우
          //   const subCategoryParam =
          //     selectedSubCategory !== null
          //       ? `&subCategory=${selectedSubCategory}` // 특정 하위 카테고리 요청
          //       : ''; // 전체 데이터 요청 (하위 카테고리가 없을 경우)

          const provinceParam =
            selectedRegion && selectedRegion.id > 0
              ? `&province=${selectedRegion.name}`
              : '';
          const districtParam =
            selectedSubRegion && selectedSubRegion.id > 0
              ? `&district=${selectedSubRegion.name}`
              : '';
          const res = await axios.get(
            //`https://677e23a294bde1c1252a8cc0.mockapi.io/plans`
            `${baseUrl}/api/plans?cursor=${cursor}&&size=10&page=0&categoryId=${categoryParam}${provinceParam}${districtParam}`,
          );
          const newData = res.data;
          // API 리스폰스: newData.data.planList 과 newData.data.nextCursor를 사용
          const formatted = newData.data.planList as PlanDataWithCategory[];
          onDataFetched(formatted);
          // 만약 nextCursor가 null이면 더 이상 로딩하지 않음
          if (newData.data.nextCursor === null || formatted.length === 0) {
            setCursor(null);
            // observer를 해제하여 더 이상 호출되지 않도록 함
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
    };

    // 옵저버 인스턴스 생성 (의존성 변경 시마다 새로 생성됨)
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
  }, [
    // 아래 값들이 변경되면 observer가 새로 생성,
    // cursor가 null 인 경우 observer 해제
    cursor,
    isFetching,
    selectedSubCategory,
    selectedRegion,
    selectedSubRegion,
    onDataFetched,
  ]);

  return { loaderRef };
};
