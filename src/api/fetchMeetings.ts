import instance from '@/utils/axios';
import { QueryFunctionContext } from '@tanstack/react-query';
import { FetchMeetingsResponse } from '@/types/api/meetingList';
import { AxiosError } from 'axios';

export const fetchMeetings = async ({
  pageParam = null,
  queryKey,
}: QueryFunctionContext<
  [string, string | undefined, number | undefined]
>): Promise<FetchMeetingsResponse> => {
  const [, selectedSort, selectedCategory] = queryKey;

  try {
    const response = await instance.get('/api/meetings', {
      params: {
        sort: selectedSort,
        categoryId: selectedCategory === 0 ? undefined : selectedCategory,
        cursor: pageParam,
        size: 10,
      },
      withCredentials: false,
    });

    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 401) {
      console.warn('비로그인 상태에서 401 에러 발생, 기본 데이터를 반환.');
      return { meetingList: [], nextCursor: null }; // 빈 데이터 반환
    }
    throw axiosError; // 다른 에러는 그대로 던짐
  }
};
