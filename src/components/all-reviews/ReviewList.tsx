import React, { useState } from 'react';
import HeartRating from '@/components/shared/HeartRating';
import ReviewImageModal from '@/components/all-reviews/ReviewImageModal';
import { Review } from '../../types/reviewType';
import useToggle from '@/hooks/useToggle';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  console.log(reviews.map((review) => review.reviewId));
  const { toggleValue: isModalOpen, handleOpen, handleClose } = useToggle();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleImageClick = (images: string[]) => {
    setSelectedImages(images);
    handleOpen();
  };
  if (!Array.isArray(reviews) || reviews.length === 0) {
    return (
      <p className="text-center text-gray-600">
        선택된 조건에 맞는 리뷰가 없습니다.
      </p>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <li
            key={`${review.reviewId}-${index}`} // index와 조합하여 고유성 확보
            className="flex flex-col items-start rounded-lg bg-white p-4 shadow-md"
          >
            <div
              onClick={() =>
                handleImageClick(
                  Array.isArray(review.reviewImages) ? review.reviewImages : [],
                )
              } // 이미지 클릭 시 모달 열기
              className="relative mb-4 aspect-[5/3] w-full cursor-pointer rounded-md md:mb-0 md:mr-4 md:h-24 md:w-24"
            >
              <img
                src={review.reviewImages?.[0]}
                alt={review.planName}
                className="object-cover"
              />
            </div>
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
      <ReviewImageModal
        isOpen={isModalOpen}
        handleClose={handleClose}
        images={selectedImages}
      />
    </>
  );
};

export default ReviewList;
