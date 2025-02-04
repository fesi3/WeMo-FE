import { API_PATHS } from '@/constants/apiPath';
import {
  MeetingDetailResponse,
  CreateMeetingRequestBody,
  CreateMeetingResponse,
} from '@/types/api/meeting';
import instance from './axiosInstance';
import { isAxiosError } from 'axios';
import { ApiErrorResponse, ApiResponse } from '@/types/api/apiResponse';

export const createMeeting = async (requestBody: CreateMeetingRequestBody) => {
  try {
    const response = await instance.post<CreateMeetingResponse>(
      API_PATHS.MEETING.CREATE,
      requestBody,
    );
    return response.data;
  } catch (error) {
    if (!isAxiosError(error)) return;
    if (!error.response) return;
    const response = error.response.data as ApiErrorResponse;
    console.error(`${error.status}: ${response.message}`);
  }
  //에러핸들링 어떻게 할지 고민중
};

export const fetchMeetingDetail = async (meetingId: number) => {
  if (isNaN(meetingId)) return;
  const response = await instance<MeetingDetailResponse>(
    API_PATHS.MEETING.GET_DETAIL(meetingId),
  );
  return response.data;
};

export const joinMeeting = async (meetingId: number) => {
  try {
    if (isNaN(meetingId)) throw new Error('유효하지 않은 모임ID입니다.');
    const response = await instance.post<ApiResponse>(
      API_PATHS.MEETING.JOIN(meetingId),
    );
    return response.data.success;
  } catch (error) {
    if (!isAxiosError(error)) return;
    if (!error.response) return;
    const response = error.response.data as ApiErrorResponse;
    alert(error.message || response.message); // 토스트로 리팩토링
    return false;
  }
};

export const leaveMeeting = async (meetingId: number) => {
  try {
    if (isNaN(meetingId)) throw new Error('유효하지 않은 모임ID입니다.');
    const response = await instance.delete<ApiResponse>(
      API_PATHS.MEETING.LEAVE(meetingId),
    );
    return response.data.success;
  } catch (error) {
    if (!isAxiosError(error)) return;
    if (!error.response) return;
    const response = error.response.data as ApiErrorResponse;
    alert(error.message || response.message); // 토스트로 리팩토링
    return false;
  }
};
