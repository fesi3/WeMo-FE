import { PATHS } from '@/constants/apiPath';
import {
  GET_MEETING_DETAIL_RESPONSE,
  POST_MEETING_REQUEST_BODY,
} from '@/types/api/meeting';
import fetchData from './fetchData';

interface POST_MEETING_RESPONSE_BODY {
  success: boolean;
  message: string;
  data: null;
}

export const createMeeting = async (requestData: POST_MEETING_REQUEST_BODY) => {
  const response: unknown = await fetchData<POST_MEETING_REQUEST_BODY>({
    param: PATHS.MEETING.CREATE,
    method: 'post',
    requestData,
  });
  return response as POST_MEETING_RESPONSE_BODY;
};

export const fetchMeetingDetail = async (meetingId: number) => {
  if (isNaN(meetingId)) return;
  const response = await fetchData<GET_MEETING_DETAIL_RESPONSE>({
    param: PATHS.MEETING.GET_DETAIL(meetingId.toString()),
    method: 'get',
  });
  return response;
};
