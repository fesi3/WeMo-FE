import {
  fetchMypageMeetings,
  fetchMypagePlans,
  fetchMypageReviewables,
  fetchMypageReviews,
  fetchMypageUserInfo,
  fetchMyPlanCalendar,
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
  tab: boolean,
) => {
  // const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return useQuery({
    queryKey: ['planList', status, page, tab],
    queryFn: () => fetchMypagePlans(apiUrl),
    //   enabled: isLoggedIn, // (로그인 상태일 때만 실행)
    staleTime: 100 * 1000, // 10초
  });
};

// 모임 데이터를 가져오는 커스텀 훅
export const useMypageMeetings = (
  apiUrl: string,
  status: string,
  page: number,
  // enabled: boolean,
  tab: boolean,
) => {
  // const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return useQuery({
    queryKey: ['meetingList', status, page, tab],
    queryFn: () => fetchMypageMeetings(apiUrl),
    //   enabled: isLoggedIn, // (로그인 상태일 때만 실행)
    staleTime: 100 * 1000, // 10초
    // enabled,
  });
};

// 리뷰 데이터를 가져오는 커스텀 훅
export const useMypageReviews = (
  apiUrl: string,
  page: number,
  // enabled: boolean,
  tab: boolean,
) => {
  return useQuery({
    queryKey: ['reviewedList', page, tab],
    queryFn: () => fetchMypageReviews(apiUrl),
    staleTime: 100 * 1000, // 10초
    // enabled,
  });
};

// 리뷰 가능한 데이터를 가져오는 커스텀 훅
export const useMypageReviewables = (
  apiUrl: string,
  page: number,
  // enabled: boolean,
  tab: boolean,
) => {
  return useQuery({
    queryKey: ['reviewableList', page, tab],
    queryFn: () => fetchMypageReviewables(apiUrl),
    staleTime: 100 * 1000, // 10초
    // enabled,
  });
};

//마이페이지 일정 달력 가져오는 커스텀 훅
export const useMyPlanCalendar = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ['myCalendar', startDate, endDate],
    queryFn: () => fetchMyPlanCalendar(startDate, endDate),
    //   enabled: isLoggedIn, // (로그인 상태일 때만 실행)
    staleTime: 100 * 1000, // 10초
  });
};
