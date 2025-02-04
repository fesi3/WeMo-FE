import { API_PATHS } from '@/constants/apiPath';
import {
  CreatePlanRequestBody,
  CreatePlanResponse,
  PlanDetailResponse,
} from '@/types/api/plan';
import instance from './axiosInstance';
import { ApiResponse } from '@/types/api/apiResponse';

interface PostPlanParams {
  meetingId: number;
  requestBody: CreatePlanRequestBody;
}

export const createPlan = async ({
  meetingId,
  requestBody,
}: PostPlanParams) => {
  const response = await instance.post<CreatePlanResponse>(
    API_PATHS.PLAN.CREATE(meetingId),
    requestBody,
  );
  return response.data;
};

export const fetchPlanDetail = async (planId: number) => {
  if (isNaN(planId)) return;
  const response = await instance<PlanDetailResponse>(
    API_PATHS.PLAN.GET_DETAIL(planId),
  );
  return response.data;
};

export const attendPlan = async (planId: number) => {
  try {
    if (isNaN(planId)) return;
    const response = await instance.post<ApiResponse>(
      API_PATHS.PLAN.ATTEND(planId),
    );
    return response.data.success;
  } catch {
    return false;
  }
};

export const leavePlan = async (planId: number) => {
  try {
    if (isNaN(planId)) return;
    const response = await instance.delete<ApiResponse>(
      API_PATHS.PLAN.ATTEND(planId),
    );
    return response.data.success;
  } catch {
    return false;
  }
};

export const likePlan = async (planId: number) => {
  try {
    if (isNaN(planId)) return;
    const response = await instance.post<ApiResponse>(
      API_PATHS.PLAN.LIKE(planId),
    );
    return response.data.success;
  } catch {
    return false;
  }
};

export const unLikePlan = async (planId: number) => {
  try {
    if (isNaN(planId)) return;
    const response = await instance.delete<ApiResponse>(
      API_PATHS.PLAN.LIKE(planId),
    );
    return response.data.success;
  } catch {
    return false;
  }
};
