import Image from 'next/image';
import Button from '../shared/Button';
import { ReviewData } from '@/pages/user/[username]/review';
import { formatTime } from '@/utils/dateUtils';

interface ReviewProps {
  reviewed: ReviewData;
}

// 별점 리턴
const scoreRender = (score: number) => {
  const stars = ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'];
  return stars[score - 1] || null;
};

const ReviewCard = ({ reviewed }: ReviewProps) => {
  const {
    reviewId,
    planName,
    dateTime,
    category,
    address,
    score,
    comment,
    reivewImagePath,
    planId,
  } = reviewed;

  const modifyReview = (reviewId: number) => {
    console.log(reviewId, '번 리뷰 삭제');
    // 수정 모달 추가
  };
  const goPlanDetail = (planId: number) => {
    console.log(planId, '번 으로 이동');
    // 일정 상세로 이동
  };

  return (
    <div className="my-5 flex flex-col gap-4 rounded-lg border border-gray-200 bg-gray-100 p-3">
      {/* 일정 정보 */}
      <div
        className="flex items-center gap-4 bg-white p-2"
        onClick={() => {
          goPlanDetail(planId);
        }}
      >
        <div className="relative h-[70px] w-[70px]">
          <Image
            src={reivewImagePath}
            alt="리뷰 이미지"
            layout="fill" // div를 채우도록 설정
            objectFit="cover" // 비율을 유지하면서 div 크기에 맞게 이미지 조정
          />
        </div>
        <div>
          <span className="rounded-md bg-[#00000080] p-1 text-center text-sm text-white">
            {category}
          </span>

          <div className="my-1 text-base font-semibold">{planName}</div>

          <div className="text-sm text-[#A4A4A4]">
            {address} | {formatTime(dateTime)} 이용
          </div>
        </div>
      </div>

      {/* 리뷰 정보 */}
      <div className="flex flex-col gap-4">
        {/* 별점 */}
        <div className="flex justify-between">
          <div>
            {scoreRender(score)} {score}
          </div>

          <Button
            type="modify_mypage"
            text="삭제"
            textColor="black"
            onClick={() => {
              modifyReview(reviewId);
            }}
          />
        </div>
        {/* 코멘트 */}
        <div>{comment}</div>
        <div className="relative flex h-[140px] w-full">
          <Image
            src={reivewImagePath}
            alt="리뷰 이미지"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        {/* 나중에 이미지 여러 개 들어오면 가로 스크롤(최대 5개) */}
        {/* <div className="flex h-[140px] w-full gap-3">
          <div className="relative flex h-[140px] w-1/2 rounded-lg border border-black">
            <Image
              src={reivewImagePath}
              alt="리뷰 이미지"
              layout="fill" // div를 채우도록 설정
              objectFit="cover" // 비율을 유지하면서 div 크기에 맞게 이미지 조정
            />
          </div>

          <div className="relative flex h-[140px] w-1/2 rounded-lg border border-black">
            <Image
              src={reivewImagePath}
              alt="리뷰 이미지"
              layout="fill" 
              objectFit="cover" 
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ReviewCard;
