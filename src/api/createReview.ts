import axiosInstance from '@/api/axiosInstance';
import { PATHS } from '@/constants/apiPath';

interface CreateReviewRequestBody {
  score: number;
  comment: string;
  fileUrls: string[];
}

export const createReview = async (
  planId: number,
  requestBody: CreateReviewRequestBody,
) => {
  try {
    await axiosInstance.post(PATHS.REVIEW.CREATE(planId), requestBody);
  } catch {
    console.log('에러');
  }
};
