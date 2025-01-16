import Avatar from '@/components/shared/avatar/Avatar';
import HeartRating from '@/components/shared/HeartRating';
import useToggle from '@/hooks/useToggle';
import type { ReviewInMeeting } from '@/types/api/meeting';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
interface ReviewListInMeetingProps {
  review: ReviewInMeeting;
}
export default function ReviewInMeeting({ review }: ReviewListInMeetingProps) {
  console.log(review);
  const { toggleValue, handleOpen, handleClose } = useToggle();
  return (
    <div
      className="flex flex-col gap-2 bg-[#f7f7f7] p-3"
      key={review.createdAt}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10" imageUrl={review.profileImagePath} />
          <span className="font-semibold">{review.nickname}</span>
        </div>
        <HeartRating rating={review.score} />
      </div>
      <div
        className={`${toggleValue || 'line-clamp-3 overflow-hidden text-ellipsis'}`}
      >
        {review.comment}
      </div>
      {toggleValue && <div>리뷰 이미지</div>}
      <div className="flex w-full justify-end">
        <button
          onClick={toggleValue ? handleClose : handleOpen}
          className="flex items-center gap-1 rounded-lg bg-primary-10 px-2 py-1 text-sm text-white"
        >
          <span>{toggleValue ? '접기' : '펼쳐보기'}</span>
          {toggleValue ? (
            <ArrowUpIcon width={15} height={15} />
          ) : (
            <ArrowDownIcon width={15} height={15} />
          )}
        </button>
      </div>
    </div>
  );
}
