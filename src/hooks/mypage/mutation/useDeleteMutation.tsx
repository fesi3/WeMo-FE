import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteCreatedMeeting,
  deleteCreatedPlan,
  deleteReview,
} from '@/api/modifyMypage';
import { showToast } from '@/utils/handleToast';
import axios from 'axios';

// 마이페이지 - 일정 취소하기 버튼(내가 만든 일정) -patch로
export function useDeletePlanMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (planId: number) => {
      await deleteCreatedPlan(planId);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['planList', 'created', 1],
      });
      showToast('success', '내가 만든 일정이 삭제되었습니다');
    },

    onError: (error) => {
      console.log(error.message);
      showToast('error', '일정 삭제가 실패되었습니다');
    },
  });
}

// 마이페이지 - 모임 삭제하기 버튼(내가 만든 모임)
export function useDeleteMeetingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (meetingId: number) => {
      await deleteCreatedMeeting(meetingId);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['meetingList', 'created', 1],
      });
      showToast('success', '내가 만든 모임을 삭제하었습니다.');
    },

    // onError: (error) => {
    //   console.log(error.message);
    //   showToast('error', '모임 삭제가 실패되었습니다');
    // },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error?.response?.data?.message || '모임 삭제에 실패했습니다';
        if (error?.response?.data) {
          showToast('error', `[삭제 실패] ${errorMessage}`);
        } else {
          showToast('error', '모임 삭제에 실패했습니다');
        }
      } else {
        // AxiosError가 아닌 경우
        showToast('error', '알 수 없는 오류가 발생했습니다.');
      }
    },
  });
}

// 마이페이지 - 리뷰 삭제하기 버튼
export function useDeleteReviewMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (reviewId: number) => {
      await deleteReview(reviewId);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['reviewedList', 1],
      });
      showToast('success', '내가 만든 모임을 삭제하었습니다.');
    },

    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error?.response?.data?.message || '리뷰 삭제에 실패했습니다';
        if (error?.response?.data) {
          showToast('error', `[삭제 실패] ${errorMessage}`);
        } else {
          showToast('error', '리뷰 삭제에 실패했습니다');
        }
      } else {
        // AxiosError가 아닌 경우
        showToast('error', '알 수 없는 오류가 발생했습니다.');
      }
    },
  });
}
