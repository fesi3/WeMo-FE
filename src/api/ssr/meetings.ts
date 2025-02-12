import { API_PATHS } from '@/constants/apiPath';
import { PlanDetailResponse } from '@/types/api/plan';
import { ssrInstance } from '@/utils/axiosSsr';
import axios from 'axios';

export const fetchMeetingDetailSSR = async (
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
