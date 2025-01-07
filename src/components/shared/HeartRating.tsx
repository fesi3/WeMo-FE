import React from 'react';

interface HeartRatingProps {
  rating: number; // 현재 평점
  maxRating?: number; // 최대 평점 (기본값: 5)
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
    <div className="flex gap-2 justify-center">
      {Array.from({ length: maxRating }, (_, index) => (
        <img
          key={index}
          src={
            index < rating
              ? '/assets/icons/heart.svg'
              : '/assets/icons/emptyHeart.svg'
          }
          alt={`Heart ${index + 1}`}
          className="
            cursor-pointer
            w-6 h-6            
            md:w-8 md:h-8    // 태블릿
            xl:w-10 xl:h-10    // PC
          "
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default HeartRating;
