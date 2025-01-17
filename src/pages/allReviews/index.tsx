import React, { useEffect, useState } from 'react';
import FilterBar from '@/components/shared/FilterBar';
import ReviewList from '@/components/all-reviews/ReviewList';
import { filterReviews } from '@/utils/filterReviews';
import { Review, FilterState } from '@/types/reviewType';

const BASE_URL = 'https://677e23a294bde1c1252a8cc0.mockapi.io';

const ReviewPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<FilterState>({
    region: null,
    subRegion: null,
    date: null,
    sort: null,
  });

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/reviews`);
      if (!response.ok)
        throw new Error('리뷰 데이터를 가져오는 데 실패했습니다.');
      const data = await response.json();
      console.log(data);
      setReviews(data.data.reviewContentList || []);
      setFilteredReviews(data.data.reviewContentList || []);
    } catch (error) {
      console.error('에러:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    setFilteredReviews(filterReviews(reviews, filters));
  }, [filters, reviews]);
  if (loading)
    return <p className="text-center text-gray-600">로딩 중입니다...</p>;

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-4">
      <h1 className="text-center text-2xl font-bold">리뷰 페이지</h1>
      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        sortOptions={[
          { id: 1, name: '참여자 많은순' },
          { id: 2, name: '참여자 적은순' },
        ]}
      />
      <ReviewList reviews={filteredReviews} />
    </div>
  );
};

export default ReviewPage;
