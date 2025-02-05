import { joinMeeting, leaveMeeting } from '@/api/meeting';
import { QUERY_KEY } from '@/constants/queryKey';
import TOAST_MESSAGE from '@/constants/toastMessage';
import { MeetingDetailResponse } from '@/types/api/meeting';
import { showToast } from '@/utils/showToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface useJoinMeetingParams {
  meetingId: number;
  isJoined?: boolean;
}

export default function useJoinMeetingMutation({
  meetingId,
  isJoined,
}: useJoinMeetingParams) {
  const queryClient = useQueryClient();
  const meetingDetailQueryKey = QUERY_KEY.meetingDetail(meetingId);
  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: meetingDetailQueryKey });
      const meetingDetailData = queryClient.getQueryData<MeetingDetailResponse>(
        meetingDetailQueryKey,
      );
      if (!meetingDetailData) return;
      const memberCountChange = isJoined ? -1 : 1;
      const updatedData = {
        ...meetingDetailData.data,
        isJoined: !isJoined,
        memberCount: meetingDetailData.data.memberCount + memberCountChange,
      };
      queryClient.setQueryData(meetingDetailQueryKey, () => ({
        ...meetingDetailData,
        data: { ...updatedData },
      }));

      return { meetingDetailData, updatedData };
    },
    mutationFn: async () => {
      const result = !isJoined
        ? await joinMeeting(meetingId)
        : await leaveMeeting(meetingId);
      if (!result) throw new Error();
    },
    onSuccess: () => {
      showToast(
        'success',
        isJoined ? TOAST_MESSAGE.LEAVE_MEETING : TOAST_MESSAGE.JOIN_MEETING,
      );
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(
        meetingDetailQueryKey,
        context?.meetingDetailData,
      );
      showToast(
        'error',
        isJoined
          ? TOAST_MESSAGE.LEAVE_MEETING_ERROR
          : TOAST_MESSAGE.JOIN_MEETING_ERROR,
      );
    },
  });
}
