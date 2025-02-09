import instance from '@/api/axiosInstance';
import { QueryFunctionContext } from '@tanstack/react-query';
import { FetchMeetingsResponse } from '@/types/api/meetingList';

export const fetchMeetings = async ({
  pageParam = null,
  queryKey,
}: QueryFunctionContext<
  [string, string | undefined, number | undefined]
>): Promise<FetchMeetingsResponse> => {
  const [, selectedSort, selectedCategory] = queryKey;

  const response = await instance.get('/api/meetings', {
    params: {
      sort: selectedSort, // 정렬 기준 추가
      category: selectedCategory, // 카테고리 추가
      cursor: pageParam,
      size: 10,
    },
    withCredentials: true,
  });

  return response.data.data;
};
