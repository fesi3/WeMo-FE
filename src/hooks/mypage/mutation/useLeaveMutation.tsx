import { useMutation, useQueryClient } from '@tanstack/react-query';
import { leaveJoinedMeeting, leaveJoinedPlan } from '@/api/modifyMypage';
import { showToast } from '@/utils/handleToast';
import axios from 'axios';

// 마이페이지 - 일정 취소하기 버튼(내가 참가한 일정)
export function useLeavePlanMutation() {
  const queryClient = useQueryClient(); //QueryClientProvider에서 만든 queryClient를 가져옴

  return useMutation({
    //서버에 요청을 보내는 함수
    mutationFn: async (planId: number) => {
      await leaveJoinedPlan(planId);
    },
    // 삭제 요청 성공 시 실행
    onSuccess: async () => {
      // ✅ 최신 데이터 다시 불러오기(나중에 데이터 많아지면 취소 성공 시 해당하는 페이지 기준으로 다시 불러오기)
      await queryClient.invalidateQueries({
        queryKey: ['planList', 'joined', 1],
      });
      // showToast('success', '일정이 취소되었습니다');
    },
    // 삭제 요청 실패 시 실행
    // onError: (error) => {
    //   console.log(error.message);
    //   showToast('error', '일정 취소가 실패되었습니다');
    // },
    onError: (error: unknown) => {
      // error가 AxiosError 객체인지 확인하고 메시지 처리
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error?.response?.data?.message || '일정 취소가 실패되었습니다';
        if (error?.response?.data) {
          showToast('error', `[취소 실패] ${errorMessage}`);
        } else {
          showToast('error', '일정 취소가 실패되었습니다');
        }
      } else {
        // AxiosError가 아닌 경우
        showToast('error', '알 수 없는 오류가 발생했습니다.');
      }
    },
  });
}

// 마이페이지 - 모임 탈퇴하기 버튼(내가 참가한 모임)
export function useLeaveMeetingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (meetingId: number) => {
      await leaveJoinedMeeting(meetingId);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['meetingList', 'joined', 1],
      });
      // showToast('success', '모임에서 탈퇴되었습니다.');
    },

    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error?.response?.data?.message || '모임 탈퇴를 실패했습니다';
        if (error?.response?.data) {
          showToast('error', `[탈퇴 실패] ${errorMessage}`);
        } else {
          showToast('error', '모임 탈퇴를 실패했습니다');
        }
      } else {
        // AxiosError가 아닌 경우
        showToast('error', '알 수 없는 오류가 발생했습니다.');
      }
    },
  });
}
