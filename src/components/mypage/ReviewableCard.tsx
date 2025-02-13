import Image from 'next/image';
import { fromNow } from '@/utils/dateUtils';
import { ReviewPlanData } from '@/types/mypageType';
import Button from '@/components/shared/Button';
import useToggle from '@/hooks/useToggle';
import { useState } from 'react';
import Modal from '../shared/modals/Modal';
import ReviewModal from './ReviewsModal';
import { extractPathFromPresignedUrl } from '@/utils/extractPathFromPresignedUrl';
import { createReview } from '@/api/createReview';

interface reviewableProps {
  reviewable: ReviewPlanData;
}

const ReviewableCard = ({ reviewable }: reviewableProps) => {
  const { planName, category, dateTime, planImagePath, planId } = reviewable;

  const goPlanDetail = (planId: number) => {
    console.log(planId, '번 으로 이동');
    // 일정 상세로 이동
  };

  // useToggle 훅으로 모달 열림/닫힘 관리
  const { toggleValue: isModalOpen, handleOpen, handleClose } = useToggle();
  const [submittedData, setSubmittedData] = useState<{
    score: number;
    comment: string;
  } | null>(null); // 제출된 데이터 상태 관리

  console.log(submittedData);

  // ReviewModal 제출 핸들러
  const handleSubmit = async (data: {
    score: number;
    comment: string;
    imageUrls?: string[];
  }) => {
    try {
      // 이미지 URL이 있으면 Presigned URL에서 경로 추출
      const formattedImageUrls = data.imageUrls
        ? extractPathFromPresignedUrl(data.imageUrls)
        : [];

      console.log('이미지 url ', formattedImageUrls);

      // API 요청 데이터
      const requestData = {
        ...data,
        fileUrls: formattedImageUrls,
      };

      // 리뷰 데이터 API로 전송
      await createReview(planId, requestData);

      setSubmittedData(requestData); // 제출된 데이터를 상태에 저장
      handleClose(); // 모달 닫기
      window.location.reload();
    } catch (error) {
      console.error('리뷰 제출 실패:', error);
      // 오류 처리
    }
  };

  return (
    <div className="my-5 flex min-w-[320px] flex-col gap-3 rounded-md border bg-white px-4 py-3 shadow-lg sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:p-6 sm:shadow-xl md:gap-5">
      <div className="flex flex-col gap-4">
        <div className="text-[rgb(164,164,164)]">
          {fromNow(dateTime)} 이용완료
        </div>

        <div className="mb-3 flex gap-3">
          <div className="relative h-[60px] w-[70px]">
            <Image
              src={planImagePath}
              alt="모임 사진"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
              onClick={() => {
                goPlanDetail(planId);
              }}
            />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <div className="text-lg font-semibold">{planName}</div>

            <div className="text-sm">{category} </div>
          </div>
          <div className="flex items-center"> </div>
        </div>
      </div>
      <div></div>
      <Button
        text="리뷰쓰기"
        variant={'outline'}
        onClick={() => {
          handleOpen();
        }}
        // width={132}
        height={42}
        className="w-full self-end sm:w-[132px]"
      />

      {/* 모달 */}
      <Modal isOpen={isModalOpen} handleClose={handleClose} title="리뷰 작성">
        <ReviewModal
          planId={planId}
          mode="create" // 작성 모드
          onSubmit={handleSubmit} // 제출 핸들러 연결
          onClose={handleClose} // 모달 닫기 핸들러
        />
      </Modal>
    </div>
  );
};

export default ReviewableCard;
