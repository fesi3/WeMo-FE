import { ReviewData } from '@/types/mypageType';
import PlanInfo from './ReviewCard/PlanInfo';
import Link from 'next/link';
import ReviewInfo from './ReviewCard/ReviewInfo';
interface ReviewProps {
  reviewed: ReviewData;
}

const ReviewCard = ({ reviewed }: ReviewProps) => {
  const {
    reviewId,
    planName,
    dateTime,
    address,
    score,
    comment,
    reviewImages,
    planImagePath,
    planId,
  } = reviewed;

  // console.log('review이미지', reviewImagePath);

  return (
    <div className="my-5 flex flex-col gap-4 rounded-xl border border-gray-200 p-3">
      {/* 일정 정보 */}
      <Link href={`/plans/${planId}`}>
        <PlanInfo
          planName={planName}
          dateTime={dateTime}
          address={address}
          planImagePath={planImagePath}
        />
      </Link>
      <div className="border"></div>
      {/* 리뷰 정보 */}
      <ReviewInfo
        score={score}
        reviewId={reviewId}
        comment={comment}
        reviewImagePath={reviewImages}
      />
    </div>
  );
};

export default ReviewCard;
