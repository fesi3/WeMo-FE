import { PATHS } from '@/constants/apiPath';
import { POST_MEETING_REQUEST_BODY } from '@/types/api/meeting';
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
