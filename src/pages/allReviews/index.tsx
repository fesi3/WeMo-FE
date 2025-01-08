import React, { useState } from 'react';
import ReviewModal from '@/components/shared/modals/ReviewsModal';

export default function AllReviews() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleReviewSubmit = (data: { rating: number; review: string }) => {
    console.log('리뷰 제출 데이터:', data);
    // 서버 전송 로직 추가
    alert('리뷰가 제출되었습니다!');
  };

  return (
    <div className="mx-auto max-w-lg p-6">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">리뷰 목록</h1>
      <button
        onClick={openModal}
        className="rounded-lg bg-orange-500 px-4 py-2 text-white transition hover:bg-orange-600"
      >
        리뷰 작성하기
      </button>

      <ReviewModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
}
