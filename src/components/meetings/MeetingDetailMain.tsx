import { MeetingData } from '@/types/api/meeting';
import Avatar from '../shared/avatar/Avatar';
import Carousel from '../shared/Carousel';
import DateBadge from '../shared/DateBadge';
import SectionLayout from './layout/SectionLayout';
import IconWithCount from './ui/IconWithCount';
import MemberList from './ui/MemberList';
import {
  CalendarDaysIcon,
  StarIcon,
  UserGroupIcon,
} from '@heroicons/react/20/solid';
import PlanCardListInMeeting from './ui/PlanCardListInMeeting';
import ReviewListInMeeting from './ui/ReviewInMeeting';

interface MeetingDetailMainProps {
  meetingData: MeetingData;
}

export default function MeetingDetailMain({
  meetingData,
}: MeetingDetailMainProps) {
  return (
    <>
      <div className="mt-[70px] flex w-full flex-col gap-10 p-3">
        <Carousel images={[meetingData.meetingImagePath]} />
        <div className="flex flex-col gap-1 font-bold">
          <span>모임 정보</span>
          <div className="flex flex-col gap-4 rounded-md bg-[#f6f6f6] p-3">
            <div className="flex w-full justify-between">
              <span>{meetingData.meetingName}</span>
              <DateBadge>{meetingData.category}</DateBadge>
            </div>
            <div>{meetingData.description}</div>
            <div className="flex items-end justify-between">
              <div className="flex-center gap-2">
                <Avatar
                  imageUrl={meetingData.profileImagePath}
                  className="h-10 w-10"
                />
                <span>{meetingData.nickname}</span>
              </div>
              <div>
                <div className="flex flex-col text-sm font-semibold text-black-sub">
                  <IconWithCount
                    icon={<UserGroupIcon />}
                    count={meetingData.memberCount}
                    suffix="명"
                  />
                  <IconWithCount
                    icon={<CalendarDaysIcon />}
                    count={meetingData.planCounts}
                    suffix="개"
                  />
                  <IconWithCount
                    icon={<StarIcon />}
                    count={meetingData.reviewCounts}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <SectionLayout
          onClickViewMore={() => {}}
          title={`멤버 ${meetingData.memberCount}명`}
        >
          <MemberList members={meetingData.memberList} />
        </SectionLayout>
        <SectionLayout onClickViewMore={() => {}} title="다가오는 일정">
          <PlanCardListInMeeting planList={meetingData.planList} />
        </SectionLayout>
        <SectionLayout onClickViewMore={() => {}} title="리뷰 목록">
          <div className="flex flex-col gap-5">
            {meetingData.reviewList.map((review) => (
              <ReviewListInMeeting key={review.createdAt} review={review} />
            ))}
          </div>
        </SectionLayout>
      </div>
    </>
  );
}
