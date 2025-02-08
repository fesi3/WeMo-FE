import fetchReviews from '@/api/reviews';
import axiosInstance from '@/utils/axios';
import { FilterState } from '@/types/reviewType';

jest.mock('@/utils/axios'); // axiosInstance를 목 함수로 만들어줍니다.

describe('fetchReviews', () => {
  const mockFilters: FilterState = {
    region: { id: 1, name: '서울', subRegions: [] },
    subRegion: { id: 2, name: '강남구' },
    date: null,
    sort: { id: 1, name: '평점 높은 순', value: 'ratingOrder' },
  };

  beforeEach(() => {
    jest.clearAllMocks(); // 테스트마다 Mock 데이터 초기화
  });

  it('올바른 API 요청을 보내고 응답을 반환해야 한다', async () => {
    // 가짜 응답 데이터 설정
    const mockResponse = {
      data: {
        data: {
          reviewList: [
            { id: 1, comment: '좋아요!', score: 5 },
            { id: 2, comment: '최고예요!', score: 4 },
          ],
          totalPage: 3,
        },
      },
    };

    // axiosInstance.get이 호출되면 가짜 응답을 반환하도록 설정
    (axiosInstance.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    // fetchReviews 함수 실행
    const result = await fetchReviews('달램핏', mockFilters, 1);

    // 올바른 API 요청을 보냈는지 확인
    expect(axiosInstance.get).toHaveBeenCalledWith('/api/reviews', {
      params: {
        page: 1,
        size: 5,
        province: '서울',
        district: '강남구',
        startDate: undefined,
        endDate: undefined,
        categoryId: 1,
        sort: 'ratingOrder',
      },
    });

    // 반환된 데이터가 기대한 데이터와 같은지 확인
    expect(result).toEqual({
      reviews: [
        { id: 1, comment: '좋아요!', score: 5 },
        { id: 2, comment: '최고예요!', score: 4 },
      ],
      nextPage: 2, // 현재 페이지가 1이므로 다음 페이지는 2
    });
  });

  it('전체 지역 선택 시 province와 district가 undefined가 되어야 한다', async () => {
    const allFilters: FilterState = {
      region: { id: 0, name: '전체', subRegions: [] }, // "전체" 선택
      subRegion: null,
      date: null,
      sort: null,
    };

    const mockResponse = {
      data: { data: { reviewList: [], totalPage: 1 } },
    };

    (axiosInstance.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    await fetchReviews('달램핏', allFilters, 1);

    // province와 district가 undefined인지 확인
    expect(axiosInstance.get).toHaveBeenCalledWith('/api/reviews', {
      params: {
        page: 1,
        size: 5,
        province: undefined, // 전체 선택 시 undefined
        district: undefined,
        startDate: undefined,
        endDate: undefined,
        categoryId: 1,
        sort: undefined,
      },
    });
  });
});
