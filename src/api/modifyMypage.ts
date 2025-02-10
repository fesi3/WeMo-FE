import { API_PATHS } from '@/constants/apiPath';
import { ApiResponse } from '@/types/api/apiResponse';
import instance from '@/utils/axios';

// 마이페이지 일정 - 참석한 일정 취소하기
export const leaveJoinedPlan = async (planId: number) => {
  const response = await instance.delete<ApiResponse>(
    API_PATHS.PLAN.ATTEND(planId),
  );
  return response.data;
};

// 마이페이지 일정 - 참석한 모임 탈퇴하기
export const leaveJoinedMeeting = async (meetingId: number) => {
  const response = await instance.delete<ApiResponse>(
    API_PATHS.MEETING.LEAVE(meetingId),
  );
  return response.data;
};

// 마이페이지 - 만든 일정 삭제하기(patch)
export const deleteCreatedPlan = async (planId: number) => {
  const response = await instance.patch<ApiResponse>(
    API_PATHS.PLAN.CANCEL(planId),
  );
  return response.data;
};

// 마이페이지 - 만든 모임 삭제하기
export const deleteCreatedMeeting = async (meetingId: number) => {
  const response = await instance.delete<ApiResponse>(
    API_PATHS.MEETING.DELETE(meetingId),
  );
  return response.data;
};

//마이페이지 - 작성한 리뷰 삭제하기
export const deleteReview = async (reviewId: number) => {
  const response = await instance.delete<ApiResponse>(
    API_PATHS.REVIEW.DELETE(reviewId),
  );
  return response.data;
};
