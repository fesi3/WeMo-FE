import Image from 'next/image';
import { fromNow } from '@/utils/dateUtils';
import { ReviewPlanData } from '@/types/mypageType';
import Button from '@/components/shared/Button';

interface reviewableProps {
  reviewable: ReviewPlanData;
}

const ReviewableCard = ({ reviewable }: reviewableProps) => {
  const { planName, category, dateTime, planImagePath, planId } = reviewable;

  const goPlanDetail = (planId: number) => {
    console.log(planId, '번 으로 이동');
    // 일정 상세로 이동
  };

  const createReview = (planId: number) => {
    console.log(`일정 ${planId} 번 리뷰 작성 모달 열림`);
    // 일정에 대한 리뷰 작성 모달 열리기
  };
  return (
    <div className="my-5 flex flex-col gap-3 rounded-md border px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:p-6 md:gap-5">
      <div className="flex flex-col gap-2">
        <div className="text-[#A4A4A4]">{fromNow(dateTime)} 이용완료</div>

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
      <Button
        text="리뷰쓰기"
        variant={'outline'}
        onClick={() => {
          createReview(planId);
        }}
        width={132}
        height={42}
      />
    </div>
  );
};

export default ReviewableCard;
