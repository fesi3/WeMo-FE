import { likePlan, unLikePlan } from '@/features/update-plan/api/plan';
import { QUERY_KEY } from '@/shared/constants/queryKey';
import { PlanDetailResponse } from '@/shared/types/api/plan';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface usePlanLikeMutationParams {
  planId: number;
  isLiked: boolean;
}

export default function usePlanLikeMutation({
  planId,
  isLiked,
}: usePlanLikeMutationParams) {
  const queryClient = useQueryClient();
  const planDetailQueryKey = QUERY_KEY.planDetail(planId);
  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: planDetailQueryKey });
      const planDetailData =
        queryClient.getQueryData<PlanDetailResponse>(planDetailQueryKey);
      if (!planDetailData) return;
      const likeCountChange = isLiked ? -1 : 1;
      const updatedData = {
        ...planDetailData.data,
        isLiked: !isLiked,
        likeCount: planDetailData.data.likeCount + likeCountChange,
      };
      queryClient.setQueryData<PlanDetailResponse>(planDetailQueryKey, {
        ...planDetailData,
        data: updatedData,
      });
      return { planDetailData, updatedData };
    },
    mutationFn: async () => {
      const result = !isLiked
        ? await likePlan(planId)
        : await unLikePlan(planId);
      if (!result) throw new Error();
      return result;
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(planDetailQueryKey, context?.planDetailData);
    },
  });
}
