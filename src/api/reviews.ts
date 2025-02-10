import { Review, FilterState } from '@/types/reviewType';
import axiosInstance from '@/utils/axios';

const fetchReviews = async (
  category: string,
  filters: FilterState,
  pageParam: number = 1,
): Promise<{ reviews: Review[]; nextPage?: number }> => {
  const params = {
    page: pageParam,
    size: 5,
    province: filters.region?.name || undefined,
    district: filters.subRegion?.name || undefined,
    startDate: filters.date
      ? filters.date.toISOString().split('T')[0]
      : undefined,
    endDate: filters.date
      ? filters.date.toISOString().split('T')[0]
      : undefined,
    categoryId: category === '달램핏' ? 1 : 2,
    sort: filters.sort?.value || undefined,
  };

  if (filters.region && filters.region.id == 0) {
    params.province = undefined;
  }
  if (filters.subRegion && filters.subRegion.id == 0) {
    params.district = undefined;
  }
  console.log('API 요청 params:', params);

  const { data } = await axiosInstance.get('/api/reviews', { params });
  return {
    reviews: data.data.reviewList || [],
    nextPage: pageParam < data.data.totalPage ? pageParam + 1 : undefined,
  };
};

export default fetchReviews;
