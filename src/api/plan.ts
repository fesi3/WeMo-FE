import { PATHS } from '@/constants/apiPath';
import fetchData from './fetchData';
import {
  GET_PLAN_DETAIL_RESPONSE,
  POST_PLAN_REQUEST_BODY,
} from '@/types/api/plan';

//코드 이동 예정

interface PostPlanParams {
  meetingId: string;
  requestData: POST_PLAN_REQUEST_BODY;
}

export const createPlan = async ({
  meetingId,
  requestData,
}: PostPlanParams) => {
  const response = await fetchData<POST_PLAN_REQUEST_BODY>({
    param: PATHS.PLAN.CREATE(meetingId),
    method: 'post',
    requestData,
  });
  console.log(response);
};

export const fetchPlanDetail = async (planId: number) => {
  if (isNaN(planId)) return;
  const response = await fetchData<GET_PLAN_DETAIL_RESPONSE>({
    param: PATHS.PLAN.GET_DETAIL(planId.toString()),
  });
  return response;
};
