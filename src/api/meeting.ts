import { API_PATHS } from '@/constants/apiPath';
import {
  MeetingDetailResponse,
  CreateMeetingRequestBody,
  CreateMeetingResponse,
} from '@/types/api/meeting';
import instance from '../utils/axios';
import { AxiosRequestConfig, isAxiosError } from 'axios';
import { ApiErrorResponse, ApiResponse } from '@/types/api/apiResponse';
import { showToast } from '@/utils/handleToast';
import TOAST_MESSAGE from '@/constants/toastMessage';

export const createMeeting = async (requestBody: CreateMeetingRequestBody) => {
  try {
    const response = await instance.post<CreateMeetingResponse>(
      API_PATHS.MEETING.CREATE,
      requestBody,
    );
    if (!response.data.success) {
      throw new Error('실패');
    }
    showToast('success', TOAST_MESSAGE.CREATE_MEETING);
    return response.data;
  } catch (error) {
    if (!isAxiosError(error)) return;
    if (!error.response) return;
    const response = error.response.data as ApiErrorResponse;
    console.error(`${error.status}: ${response.message}`);
    showToast('error', TOAST_MESSAGE.CREATE_MEETING_ERROR);
  }
};

export const fetchMeetingDetail = async (
  meetingId: number,
  cookie?: string,
) => {
  if (isNaN(meetingId)) return;
  const config: AxiosRequestConfig = cookie
    ? { headers: { Cookie: cookie }, withCredentials: true }
    : {};
  const response = await instance<MeetingDetailResponse>(
    API_PATHS.MEETING.GET_DETAIL(meetingId),
    config,
  );
  return response.data;
};

export const joinMeeting = async (meetingId: number) => {
  try {
    if (isNaN(meetingId)) throw new Error('유효하지 않은 모임ID입니다.');
    const response = await instance.post<ApiResponse>(
      API_PATHS.MEETING.JOIN(meetingId),
    );
    showToast('success', TOAST_MESSAGE.JOIN_MEETING);
    return response.data.success;
  } catch (error) {
    if (!isAxiosError(error)) return;
    // if (!error.response) return;
    // const response = error.response.data as ApiErrorResponse;
    showToast('error', TOAST_MESSAGE.JOIN_MEETING_ERROR);
    return false;
  }
};

export const leaveMeeting = async (meetingId: number) => {
  try {
    if (isNaN(meetingId)) throw new Error('유효하지 않은 모임ID입니다.');
    const response = await instance.delete<ApiResponse>(
      API_PATHS.MEETING.LEAVE(meetingId),
    );
    showToast('success', TOAST_MESSAGE.LEAVE_MEETING);
    return response.data.success;
  } catch {
    showToast('error', TOAST_MESSAGE.LEAVE_MEETING_ERROR);
    return false;
  }
};
