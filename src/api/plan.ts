import { PATHS } from '@/constants/apiPath';
import {
  CreatePlanRequestBody,
  CreatePlanResponse,
  PlanDetailResponse,
} from '@/types/api/plan';
import instance from './axiosInstance';
import { ApiResponse } from '@/types/api/apiResponse';

interface PostPlanParams {
  meetingId: string;
  requestBody: CreatePlanRequestBody;
}

export const createPlan = async ({
  meetingId,
  requestBody,
}: PostPlanParams) => {
  const response = await instance.post<CreatePlanResponse>(
    PATHS.PLAN.CREATE(meetingId),
    requestBody,
  );
  return response.data;
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
  const response = await instance.post<ApiResponse<null>>(
    PATHS.PLAN.ATTEND(planId.toString()),
  );
  return response.data.success;
};

export const leavePlan = async (planId: number) => {
  if (isNaN(planId)) return;
  const response = await instance.delete<ApiResponse<null>>(
    PATHS.PLAN.ATTEND(planId.toString()),
  );
  return response.data.success;
};
