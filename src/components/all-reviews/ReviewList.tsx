import React from 'react';
import HeartRating from '@/components/shared/HeartRating';
import { Review } from '../../types/reviewType';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  console.log(reviews.map((review) => review.reviewId));
  if (!Array.isArray(reviews) || reviews.length === 0) {
    return (
      <p className="text-center text-gray-600">
        선택된 조건에 맞는 리뷰가 없습니다.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {reviews.map((review, index) => (
        <li
          key={`${review.reviewId}-${index}`} // index와 조합하여 고유성 확보
          className="flex flex-col items-start rounded-lg bg-white p-4 shadow-md md:flex-row md:items-center"
        >
          <img
            src={review.reviewImagePath}
            alt={review.planName}
            className="mb-4 aspect-[5/3] w-full rounded-md object-contain md:mb-0 md:mr-4 md:h-24 md:w-24"
          />
          <div className="w-full flex-1">
            <div className="flex flex-col md:flex-row md:justify-between">
              <h2 className="text-base font-semibold text-gray-800">
                {review.planName}
              </h2>

              <div className="mt-2 flex items-center justify-between md:mt-0">
                <div>{review.nickname}</div>
                <div className="flex items-center">
                  <HeartRating rating={review.score} maxRating={5} />
                  <span className="ml-2 text-sm text-gray-600">
                    {review.score.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              {review.createdAt.slice(0, 10)}
            </p>
            <p className="mt-1 text-sm text-gray-500">{review.location}</p>
            <p className="mt-2 text-sm text-gray-700">{review.comment}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ReviewList;
