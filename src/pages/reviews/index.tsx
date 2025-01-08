import HeartRating from '@/components/shared/HeartRating';
import React, { useState } from 'react';

export default function Reviews() {
  const [rating, setRating] = useState(3); // 평점 상태
  const [review, setReview] = useState(''); // 리뷰 텍스트 상태

  const handleRate = (newRating: number) => {
    setRating(newRating); // 평점을 업데이트한다.
  };

  const handleSubmit = () => {
    if (!rating) {
      alert('평점을 선택해주세요!');
      return;
    }

    if (!review.trim()) {
      alert('리뷰 내용을 작성해주세요!');
      return;
    }

    // 서버로 전송하는 로직 필요
    console.log('Submitting Review:', { rating, review });
    alert('리뷰가 제출되었습니다!');
    setReview(''); // 리뷰 초기화
    setRating(0); // 평점 초기화
  };

  return (
    <div className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">Reviews</h1>
      <p className="mb-4 text-gray-600">
        아래 하트를 클릭하여 평점을 선택하세요.
      </p>

      <HeartRating rating={rating} onRate={handleRate} />

      {/* 리뷰 입력 */}
      <textarea
        placeholder="리뷰를 작성해주세요."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="mt-4 h-32 w-full rounded-lg border border-gray-300 p-3 text-black outline-none focus:ring-2 focus:ring-orange-500"
      />

      {/* 리뷰 제출 버튼 */}
      <button
        onClick={handleSubmit}
        className="mt-4 w-full rounded-lg bg-orange-500 py-2 text-white transition hover:bg-orange-600"
      >
        리뷰 제출
      </button>
    </div>
  );
}
