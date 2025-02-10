import {
  fetchMypageMeetings,
  fetchMypagePlans,
  fetchMypageReviewables,
  fetchMypageReviews,
  fetchMypageUserInfo,
} from '@/api/fetchMypage';
import { useQuery } from '@tanstack/react-query';

// 마이페이지 사용자 데이터를 가져오는 커스텀 훅
export function useMypageUserInfo() {
  // const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return useQuery({
    queryKey: ['mypageIndex'],
    queryFn: fetchMypageUserInfo,
    //   enabled: isLoggedIn, // (로그인 상태일 때만 실행)
    staleTime: 100 * 1000, // 10초
  });
}

// 일정 데이터를 가져오는 커스텀 훅
export const useMypagePlans = (
  apiUrl: string,
  status: string,
  page: number,
  enabled: boolean,
) => {
  // const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return useQuery({
    queryKey: ['planList', status, page],
    queryFn: () => fetchMypagePlans(apiUrl),
    //   enabled: isLoggedIn, // (로그인 상태일 때만 실행)
    staleTime: 100 * 1000, // 10초
    enabled,
  });
};

// 모임 데이터를 가져오는 커스텀 훅
export const useMypageMeetings = (
  apiUrl: string,
  status: string,
  page: number,
  enabled: boolean,
) => {
  // const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return useQuery({
    queryKey: ['meetingList', status, page],
    queryFn: () => fetchMypageMeetings(apiUrl),
    //   enabled: isLoggedIn, // (로그인 상태일 때만 실행)
    staleTime: 100 * 1000, // 10초
    enabled,
  });
};

// 리뷰 데이터를 가져오는 커스텀 훅
export const useMypageReviews = (
  apiUrl: string,
  page: number,
  enabled: boolean,
) => {
  return useQuery({
    queryKey: ['reviewedList', page],
    queryFn: () => fetchMypageReviews(apiUrl),
    staleTime: 100 * 1000, // 10초
    enabled,
  });
};

// 리뷰 가능한 데이터를 가져오는 커스텀 훅
export const useMypageReviewables = (
  apiUrl: string,
  page: number,
  enabled: boolean,
) => {
  return useQuery({
    queryKey: ['reviewableList', page],
    queryFn: () => fetchMypageReviewables(apiUrl),
    staleTime: 100 * 1000, // 10초
    enabled,
  });
};
