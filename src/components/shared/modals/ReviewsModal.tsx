import React, { useState, useEffect } from 'react';
import HeartRating from '@/components/shared/HeartRating'; // 평점 컴포넌트

interface ReviewModalProps {
  mode: 'create' | 'edit'; // 모드 추가
  initialData?: { score: number; comment: string }; // 수정 모드에서 초기값
  onSubmit: (data: { score: number; comment: string }) => void; // 리뷰 제출 함수
  onClose: () => void; // 모달 닫기 함수
}

export default function ReviewModal({
  mode,
  initialData,
  onSubmit,
  onClose,
}: ReviewModalProps) {
  const [score, setScore] = useState(0); // 평점 상태
  const [comment, setComment] = useState(''); // 리뷰 텍스트 상태

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setScore(initialData.score);
      setComment(initialData.comment);
    } else if (mode === 'create') {
      setScore(0);
      setComment('');
    }
  }, [mode, initialData]);

  // 리뷰 제출 처리
  const handleSubmit = () => {
    if (!score) {
      alert('평점을 선택해주세요!');
      return;
    }
    if (!comment.trim()) {
      alert('리뷰 내용을 작성해주세요!');
      return;
    }

    onSubmit({ score, comment }); // 부모 컴포넌트에 데이터 전달한다.
    resetForm(); // 상태를 초기화 해준다.
  };

  // 상태 초기화
  const resetForm = () => {
    setScore(0);
    setComment('');
  };

  return (
    <div>
      <p className="mb-4 text-left text-lg font-bold">
        {mode === 'create'
          ? '만족스러운 경험이었나요?'
          : '리뷰를 수정해주세요.'}
      </p>

      <div className="justify-left mb-6 flex">
        <HeartRating rating={score} onRate={(newScore) => setScore(newScore)} />
      </div>

      <p className="mb-2 text-lg font-bold">경험에 대해 남겨주세요.</p>
      <textarea
        placeholder="남겨주신 리뷰는 프로그램 운영 및 다른 분들께 큰 도움이 됩니다."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="mt-2 h-32 w-full rounded-lg border border-gray-300 p-3 text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-500"
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
            score && comment.trim()
              ? 'bg-orange-500 text-white hover:bg-orange-600'
              : 'cursor-not-allowed bg-gray-300 text-gray-500'
          }`}
          disabled={!score || !comment.trim()}
        >
          {mode === 'create' ? '리뷰 등록' : '리뷰 수정'}
        </button>
      </div>
    </div>
  );
}
