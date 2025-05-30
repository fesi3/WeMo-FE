import { API_PATHS } from '@/shared/constants/apiPath';
import { PlanDetailResponse } from '@/shared/types/api/plan';
import { ssrInstance } from '@/shared/utils/axiosSsr';
import axios from 'axios';

const fetchPlanDetailSSR = async (planId: number, cookie?: string) => {
  //SSR 전용 instance에 쿠키를 전달하여 생성합니다.
  const newInstance = ssrInstance(cookie);
  if (isNaN(planId)) return;

  try {
    const response = await newInstance<PlanDetailResponse>(
      API_PATHS.PLAN.GET_DETAIL(planId),
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.status;
    }
    throw error;
  }
};

export default fetchPlanDetailSSR;
