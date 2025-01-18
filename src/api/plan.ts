import { PATHS } from '@/constants/apiPath';
import fetchData from './fetchData';
import { CreatePlanRequestBody, PlanDetailResponse } from '@/types/api/plan';

//코드 이동 예정

interface PostPlanParams {
  meetingId: string;
  requestData: CreatePlanRequestBody;
}

export const createPlan = async ({
  meetingId,
  requestData,
}: PostPlanParams) => {
  const response = await fetchData<CreatePlanRequestBody>({
    param: PATHS.PLAN.CREATE(meetingId),
    method: 'post',
    requestData,
  });
  console.log(response);
};

export const fetchPlanDetail = async (planId: number) => {
  if (isNaN(planId)) return;
  const response = await fetchData<PlanDetailResponse>({
    param: PATHS.PLAN.GET_DETAIL(planId.toString()),
  });
  return response;
};
