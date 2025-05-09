import { API_PATHS } from '@/shared/constants/apiPath';
import { PlanDetailResponse } from '@/shared/types/api/plan';
import { ssrInstance } from '@/shared/utils/axiosSsr';
import axios from 'axios';

const fetchMeetingDetailSSR = async (
  meetingId: number,
  cookie?: string,
) => {
  const newInstance = ssrInstance(cookie);
  if (isNaN(meetingId)) return;
  try {
    const response = await newInstance<PlanDetailResponse>(
      API_PATHS.MEETING.GET_DETAIL(meetingId),
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.status;
    }
    throw error;
  }
};

export default fetchMeetingDetailSSR;