import { PATHS } from '@/constants/apiPath';
import {
  MeetingDetailResponse,
  CreateMeetingRequestBody,
} from '@/types/api/meeting';
import instance from './axiosInstance';
import { isAxiosError } from 'axios';

interface CreateMeetingResponseBody {
  success: boolean;
  message: string;
  data: null;
}

export const createMeeting = async (requestBody: CreateMeetingRequestBody) => {
  try {
    const response = await instance.post<CreateMeetingResponseBody>(
      PATHS.MEETING.CREATE,
      requestBody,
    );
    return response;
  } catch (error) {
    if (!isAxiosError(error)) return;
    if (!error.response) return;
    const response = error.response.data as CreateMeetingResponseBody;
    console.error(`${error.status}: ${response.message}`);
  }
  //에러핸들링 어떻게 할지 고민중
};

export const fetchMeetingDetail = async (meetingId: number) => {
  if (isNaN(meetingId)) return;
  const response = await instance<MeetingDetailResponse>(
    PATHS.MEETING.GET_DETAIL(meetingId.toString()),
  );
  return response;
};
