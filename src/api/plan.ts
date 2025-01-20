import { PATHS } from '@/constants/apiPath';
import { CreatePlanRequestBody, PlanDetailResponse } from '@/types/api/plan';
import instance from './axiosInstance';
import { AxiosResponse } from '@/types/api/axiosResponse';

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
  return response.data;
};

export const attendPlan = async (planId: number) => {
  if (isNaN(planId)) return;
  const response = await instance.post<AxiosResponse<null>>(
    PATHS.PLAN.ATTEND(planId.toString()),
  );
  return response.data.success;
};

export const leavePlan = async (planId: number) => {
  if (isNaN(planId)) return;
  const response = await instance.delete<AxiosResponse<null>>(
    PATHS.PLAN.ATTEND(planId.toString()),
  );
  return response.data.success;
};
