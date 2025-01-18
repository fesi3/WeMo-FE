import { PATHS } from '@/constants/apiPath';
import { CreatePlanRequestBody, PlanDetailResponse } from '@/types/api/plan';
import instance from './axiosInstance';

interface PostPlanParams {
  meetingId: string;
  requestBody: CreatePlanRequestBody;
}

export const createPlan = async ({
  meetingId,
  requestBody,
}: PostPlanParams) => {
  await instance.post<CreatePlanRequestBody>(
    PATHS.PLAN.CREATE(meetingId),
    requestBody,
  );
};

export const fetchPlanDetail = async (planId: number) => {
  if (isNaN(planId)) return;
  const response = await instance<PlanDetailResponse>(
    PATHS.PLAN.GET_DETAIL(planId.toString()),
  );
  return response;
};
