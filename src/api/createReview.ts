import axiosInstance from '@/utils/axios';
import { API_PATHS } from '@/constants/apiPath';

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
    await axiosInstance.post(API_PATHS.REVIEW.CREATE(planId), requestBody);
  } catch {
    console.log('에러');
  }
};
