import Avatar from '@/components/shared/avatar/Avatar';
import HeartRating from '@/components/shared/HeartRating';
import type { ReviewInMeeting } from '@/types/api/meeting';

interface ReviewListInMeetingProps {
  review: ReviewInMeeting;
}
export default function ReviewInMeeting({ review }: ReviewListInMeetingProps) {
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
      <div>{review.comment}</div>
    </div>
  );
}
