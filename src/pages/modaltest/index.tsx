import { useState } from 'react';
import useToggle from '@/hooks/useToggle'; // useToggle 훅
import Modal from '@/components/shared/modals/Modal'; // Modal 컴포넌트
import ReviewModal from '@/components/mypage/ReviewsModal'; // ReviewModal 컴포넌트

const TestPage = () => {
  // useToggle 훅으로 모달 열림/닫힘 관리
  const { toggleValue: isModalOpen, handleOpen, handleClose } = useToggle();
  const [submittedData, setSubmittedData] = useState<{
    score: number;
    comment: string;
  } | null>(null); // 제출된 데이터 상태 관리

  // ReviewModal 제출 핸들러
  const handleSubmit = (data: { score: number; comment: string }) => {
    setSubmittedData(data); // 제출된 데이터를 저장
    handleClose(); // 모달 닫기
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-bold text-gray-800">리뷰 모달 테스트</h1>
      <button
        onClick={handleOpen} // 모달 열기
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        리뷰 작성하기
      </button>

      {/* 모달 */}
      <Modal isOpen={isModalOpen} handleClose={handleClose} title="리뷰 작성">
        <ReviewModal
          planId="1234"
          mode="create" // 작성 모드
          onSubmit={handleSubmit} // 제출 핸들러 연결
          onClose={handleClose} // 모달 닫기 핸들러
        />
      </Modal>

      {/* 제출된 데이터 표시 */}
      {submittedData && (
        <div className="mt-6 rounded border bg-gray-50 p-4">
          <h2 className="text-lg font-bold text-gray-800">제출된 데이터</h2>
          <p className="mt-2 text-sm text-gray-700">
            <strong>평점:</strong> {submittedData.score}
          </p>
          <p className="mt-1 text-sm text-gray-700">
            <strong>코멘트:</strong> {submittedData.comment}
          </p>
        </div>
      )}
    </div>
  );
};

export default TestPage;
