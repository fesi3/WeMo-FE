import Avatar from '../shared/avatar/Avatar';
import Carousel from '../shared/Carousel';
import DateBadge from '../shared/DateBadge';
import SectionContainer from './layout/SectionContainer';
import IconWithCount from './ui/IconWithCount';
import MemberList from './ui/MemberList';
import {
  CalendarDaysIcon,
  StarIcon,
  UserGroupIcon,
} from '@heroicons/react/20/solid';
import PlanCardListInMeeting from './ui/PlanCardListInMeeting';
import ReviewListInMeeting from './ui/ReviewInMeeting';
import { formatAverage } from '@/utils/formatRating';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useMeetingDetailQuery from '@/hooks/useMeetingDetailQuery';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import MeetingDetailFooter from './MeetingDetailFooter';

export default function MeetingDetailMain() {
  const [isHost, setIsHost] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const idNum = parseInt(id as string);
  const { isLoading, data, isError } = useMeetingDetailQuery(idNum);
  const meetingData = data?.data;
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user?.email === data?.data.email) {
      setIsHost(true);
    }
  }, [data?.data.email, user?.email]);
  if (isLoading) return <div>로딩중</div>;
  if (isError || !meetingData) return <div>에러</div>;
  return (
    <>
      <div className="flex w-full flex-col gap-10 p-3">
        <Carousel images={meetingData.meetingImagePath} />
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
                    count={formatAverage(meetingData.reviewAverage)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <SectionContainer
          onClickViewMore={() => {}}
          title={`멤버 ${meetingData.memberCount}명`}
        >
          <MemberList members={meetingData.memberList} />
        </SectionContainer>
        <SectionContainer onClickViewMore={() => {}} title="다가오는 일정">
          <PlanCardListInMeeting planList={meetingData.planList} />
        </SectionContainer>
        <SectionContainer onClickViewMore={() => {}} title="리뷰 목록">
          <div className="flex flex-col gap-5">
            {meetingData.reviewList.map((review) => (
              <ReviewListInMeeting key={review.createdAt} review={review} />
            ))}
          </div>
        </SectionContainer>
      </div>
      <MeetingDetailFooter isHost={isHost} />
    </>
  );
}
