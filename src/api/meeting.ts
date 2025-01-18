import { PATHS } from '@/constants/apiPath';
import {
  MeetingDetailResponse,
  CreateMeetingRequest,
} from '@/types/api/meeting';
import fetchData from './fetchData';

interface POST_MEETING_RESPONSE_BODY {
  success: boolean;
  message: string;
  data: null;
}

export const createMeeting = async (requestData: CreateMeetingRequest) => {
  const response: unknown = await fetchData<CreateMeetingRequest>({
    param: PATHS.MEETING.CREATE,
    method: 'post',
    requestData,
  });
  return response as POST_MEETING_RESPONSE_BODY;
};

export const fetchMeetingDetail = async (meetingId: number) => {
  if (isNaN(meetingId)) return;
  const response = await fetchData<MeetingDetailResponse>({
    param: PATHS.MEETING.GET_DETAIL(meetingId.toString()),
    method: 'get',
  });
  return response;
};
