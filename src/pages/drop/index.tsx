import React, { useState } from 'react';
import useToggle from '@/hooks/useToggle'; // 상태 관리 훅
import ReviewModal from '@/components/shared/modals/ReviewsModal';
import Modal from '@/components/shared/modals/Modal'; // 모달 컴포넌트

export default function AllReviews() {
  const [mode, setMode] = useState<'create' | 'edit'>('create'); // 작성/수정 구분 상태
  const { toggleValue: isOpen, handleOpen, handleClose } = useToggle(); // useToggle 사용
  const [selectedReview, setSelectedReview] = useState<
    | {
        score: number;
        comment: string;
      }
    | undefined
  >(undefined); // 수정 시 선택된 리뷰 데이터

  // 작성 모드로 모달 열기
  const openCreateModal = () => {
    setMode('create');
    setSelectedReview(undefined); // 초기화
    handleOpen();
  };

  // 수정 모드로 모달 열기
  const openEditModal = (review: { score: number; comment: string }) => {
    setMode('edit');
    setSelectedReview(review); // 수정할 리뷰 데이터 설정
    handleOpen();
  };

  // 서버로 리뷰 데이터 전송하는 로직
  const submitReviewToServer = async (data: {
    score: number;
    comment: string;
  }) => {
    try {
      const method = mode === 'create' ? 'POST' : 'PUT';
      const url =
        mode === 'create' ? `/api/reviews/planId` : `/api/reviews/reviewId`;
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('리뷰 전송 실패');
      alert(
        mode === 'create' ? '리뷰가 작성되었습니다!' : '리뷰가 수정되었습니다!',
      );
    } catch (error) {
      console.error(error);
      alert('리뷰 전송 중 오류가 발생했습니다.');
    } finally {
      handleClose();
    }
  };

  return (
    <div className="mx-auto max-w-lg p-6">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">리뷰 목록</h1>
      <button
        onClick={openCreateModal}
        className="rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
      >
        리뷰 작성하기
      </button>
      <button
        onClick={() =>
          openEditModal({
            score: 4,
            comment: '이 서비스 정말 좋았습니다!',
          })
        }
        className="ml-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        리뷰 수정하기
      </button>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          handleClose={handleClose}
          title={mode === 'create' ? '리뷰 작성' : '리뷰 수정'}
        >
          <ReviewModal
            mode={mode}
            initialData={mode === 'edit' ? selectedReview : undefined} // 수정 모드일 경우 초기 데이터 전달
            onSubmit={submitReviewToServer}
            onClose={handleClose}
          />
        </Modal>
      )}
    </div>
  );
}
