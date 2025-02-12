// 마이페이지 인덱스, 리뷰, 모임, 일정 등 get api 요청 처리

import {
  CalendarDataResponse,
  MeetingDataResponse,
  PlanDataResponse,
  ReviewableDataResponse,
  ReviewDataResponse,
  UserDataResponse,
} from '@/types/mypageType';
import { API_PATHS } from '@/constants/apiPath';
import instance from '@/utils/axios';

// 인덱스(유저 정보 가져오기) API
export const fetchMypageUserInfo = async () => {
  const response = await instance<UserDataResponse>(
    API_PATHS.MYPAGE.GET_MY_INFO,
  );
  return response.data;
};

// 마이페이지 일정 가져오기 API
export const fetchMypagePlans = async (url: string) => {
  const response = await instance<PlanDataResponse>(url);
  return response.data;
};

// 마이페이지 모임 가져오기 API
export const fetchMypageMeetings = async (url: string) => {
  const response = await instance<MeetingDataResponse>(url);
  return response.data;
};

// 마이페이지 리뷰 데이터 가져오기 API
export const fetchMypageReviews = async (url: string) => {
  const response = await instance<ReviewDataResponse>(url);
  return response.data;
};

// 마이페이지 리뷰 가능한 데이터 가져오기 API
export const fetchMypageReviewables = async (url: string) => {
  const response = await instance<ReviewableDataResponse>(url);
  return response.data;
};

// 마이페이지 달력 데이터 가져오기 API
export const fetchMyPlanCalendar = async (
  startDate: string,
  endDate: string,
) => {
  const response = await instance<CalendarDataResponse>(
    API_PATHS.MYPAGE.GET_PLAN_CALENDAR(startDate, endDate),
  );
  return response.data;
};
