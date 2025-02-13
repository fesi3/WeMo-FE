import React from 'react';
import YellowStar from '../../../src/assets/icons/yellowStar.svg';
import EmptyStar from '../../../src/assets/icons/emptyStar.svg';

interface HeartRatingProps {
  rating: number; // 현재 평점
  maxRating?: number; // 최대 평점
  onRate?: (newRating: number) => void; // 평점 변경 핸들러
}

const HeartRating: React.FC<HeartRatingProps> = ({
  rating,
  maxRating = 5,
  onRate,
}) => {
  const handleClick = (index: number) => {
    if (onRate) {
      onRate(index + 1); // 클릭한 하트의 평점을 부모로 전달
    }
  };

  return (
    <div className="flex justify-center">
      {Array.from({ length: maxRating }, (_, index) => (
        <div
          key={index}
          onClick={() => handleClick(index)}
          className="cursor-pointer"
        >
          {index < rating ? (
            <YellowStar className="h-6 w-6" />
          ) : (
            <EmptyStar className="h-6 w-6" />
          )}
        </div>
      ))}
    </div>
  );
};

export default HeartRating;
