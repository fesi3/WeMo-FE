import instance from '@/api/axiosInstance';
import { QueryFunctionContext } from '@tanstack/react-query';
import { FetchMeetingsResponse } from '@/types/api/meetingList';

export const fetchMeetings = async ({
  pageParam = null,
  queryKey,
}: QueryFunctionContext<
  [string, string | undefined, number | undefined]
>): Promise<FetchMeetingsResponse> => {
  const [, sort, categoryId] = queryKey;

  const response = await instance.get('/api/meetings', {
    params: {
      cursor: pageParam || undefined,
      size: 10,
      categoryId: categoryId || undefined,
      sort: sort || 'default',
    },
    withCredentials: true,
  });

  return response.data.data;
};
