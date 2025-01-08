import React, { useState } from 'react';
import ModalFrame from './ModalFrame';
import HeartRating from '@/components/shared/HeartRating';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { rating: number; review: string }) => void;
}

export default function ReviewModal({
  isOpen,
  onClose,
  onSubmit,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0); // 평점 상태
  const [review, setReview] = useState(''); // 리뷰 텍스트 상태

  const handleSubmit = () => {
    if (!rating) {
      alert('평점을 선택해주세요!');
      return;
    }
    if (!review.trim()) {
      alert('리뷰 내용을 작성해주세요!');
      return;
    }

    onSubmit({ rating, review }); // 부모 컴포넌트로 데이터 전달
    setRating(0);
    setReview('');
    onClose(); // 모달 닫기
  };

  return (
    <ModalFrame isOpen={isOpen} onClose={onClose} title={'리뷰 쓰기'}>
      <p className="mb-4 text-left text-lg">만족스러운 경험이었나요?</p>
      <div className="justify-left mb-6 flex">
        <HeartRating
          rating={rating}
          onRate={(newRating) => setRating(newRating)}
        />
      </div>

      <p className="text-bold mb-2 text-lg">경험에 대해 남겨주세요.</p>
      <textarea
        placeholder="남겨주신 리뷰는 프로그램 운영 및 다른 분들께 큰 도움이 됩니다."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="text-bold mt-2 h-32 w-full rounded-lg border border-gray-300 p-3 text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-500"
      />

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={onClose}
          className="rounded-lg border border-gray-300 bg-white px-6 py-2 text-gray-700 transition hover:bg-gray-100"
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          className={`rounded-lg px-6 py-2 transition ${
            rating && review.trim()
              ? 'bg-orange-500 text-white hover:bg-orange-600'
              : 'cursor-not-allowed bg-gray-300 text-gray-500'
          }`}
          disabled={!rating || !review.trim()}
        >
          리뷰 등록
        </button>
      </div>
    </ModalFrame>
  );
}
