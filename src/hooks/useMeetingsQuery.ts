import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchMeetings } from '@/api/fetchMeetings';
import { FetchMeetingsResponse } from '@/types/api/meetingList';

interface UseMeetingsParams {
  sort: string;
  category: number | undefined;
  initialData?: {
    pages: FetchMeetingsResponse[];
    pageParams: null[];
  };
}

/**
 * 선택된 정렬 기준과 카테고리에 따른 모임 목록을 무한 스크롤로 불러오는 훅
 */
export const useMeetings = ({
  sort,
  category,
  initialData,
}: UseMeetingsParams) => {
  return useInfiniteQuery<
    FetchMeetingsResponse, // TQueryFnData: 각 페이지 데이터 타입
    Error, // TError
    FetchMeetingsResponse, // TData: 변환 후 데이터 타입
    [string, string, number | undefined] // QueryKey 타입
  >({
    queryKey: ['meetings', sort, category],
    queryFn: fetchMeetings,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
    initialData,
  });
};
