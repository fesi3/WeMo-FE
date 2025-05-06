// 마이페이지 인덱스, 리뷰, 모임, 일정 등 get api 요청 처리

import {
  CalendarDataResponse,
  MeetingDataResponse,
  PlanDataResponse,
  ReviewableDataResponse,
  ReviewDataResponse,
  UserDataResponse,
} from '@/shared/types/mypageType';
import { API_PATHS } from '@/shared/constants/apiPath';
import axiosInstance from '@/shared/utils/axios';

// 인덱스(유저 정보 가져오기) API
export const fetchMypageUserInfo = async () => {
  const response = await axiosInstance<UserDataResponse>(
    API_PATHS.MYPAGE.GET_MY_INFO,
  );
  return response.data;
};

// 마이페이지 일정 가져오기 API
export const fetchMypagePlans = async (url: string) => {
  const response = await axiosInstance<PlanDataResponse>(url);
  return response.data;
};

// 마이페이지 모임 가져오기 API
export const fetchMypageMeetings = async (url: string) => {
  const response = await axiosInstance<MeetingDataResponse>(url);
  return response.data;
};

// 마이페이지 리뷰 데이터 가져오기 API
export const fetchMypageReviews = async (url: string) => {
  const response = await axiosInstance<ReviewDataResponse>(url);
  return response.data;
};

// 마이페이지 리뷰 가능한 데이터 가져오기 API
export const fetchMypageReviewables = async (url: string) => {
  const response = await axiosInstance<ReviewableDataResponse>(url);
  return response.data;
};

// 마이페이지 달력 데이터 가져오기 API
export const fetchMyPlanCalendar = async (
  startDate: string,
  endDate: string,
) => {
  const response = await axiosInstance<CalendarDataResponse>(
    API_PATHS.MYPAGE.GET_PLAN_CALENDAR(startDate, endDate),
  );
  return response.data;
};
