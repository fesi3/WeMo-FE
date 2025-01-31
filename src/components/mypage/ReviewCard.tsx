import Image from 'next/image';
import Button from '@/components/shared/Button';
import { formatTime } from '@/utils/dateUtils';
import { ReviewData } from '@/types/mypageType';

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
    <div className="my-5 flex flex-col gap-4 p-3">
      {/* 일정 정보 */}
      <div
        className="flex gap-4 p-2"
        onClick={() => {
          goPlanDetail(planId);
        }}
      >
        <div className="relative h-[60px] w-[60px]">
          <Image
            src={reivewImagePath}
            alt="리뷰 이미지"
            fill
            className="rounded-lg object-cover"
          />
        </div>
        {/* 일정 이름 + 정보 */}
        <div className="flex flex-1 flex-col justify-around">
          <p className="text-base font-semibold">{planName}</p>

          <p className="text-sm text-[#A4A4A4]">
            {address} | {formatTime(dateTime)} 이용
          </p>
        </div>
      </div>
      <div className="border"></div>

      {/* 리뷰 정보 */}
      <div className="flex flex-col gap-4">
        {/* 별점 */}
        <div className="flex justify-between">
          <div>
            {scoreRender(score)} {score}
          </div>

          <Button
            text="삭제"
            onClick={() => {
              modifyReview(reviewId);
            }}
          />
        </div>
        {/* 코멘트 */}
        <div>{comment}</div>
        <div className="relative flex h-[140px] max-w-[320px]">
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
