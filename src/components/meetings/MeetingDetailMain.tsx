import Avatar from '../shared/avatar/Avatar';
import Carousel from '../shared/Carousel';
import DateBadge from '../shared/DateBadge';
import SectionLayout from './layout/SectionLayout';
import IconWithCount from './ui/IconWithCount';
import MemberList from './ui/MemberList';

const images = [
  '/assets/icons/file.svg',
  '/assets/icons/globe.svg',
  '/assets/icons/window.svg',
];

const meetingData = {
  success: true,
  message: 'OK',
  data: {
    meetingId: 1,
    meetingName: '코딩딩',
    meetingImagePath: 'https://meeting-image.jpg',
    memberCount: 10,
    description: '스트레칭은 주기적으로 해줘야...',
    category: '오피스 스트레칭',
    nickname: '령령',
    profileImagePath: 'https://profile-image.jpg',
    createdAt: '2025-01-02 12:00:00',
    updatedAt: '2025-01-02 12:30:00',
    memberList: [
      {
        nickname: '유저1',
        profileImagePath: 'https://profile-image.jpg',
        createdAt: '2025-01-03 12:00:00',
      },

      {
        nickname: '유저2',
        profileImagePath: 'https://profile-image.jpg',
        createdAt: '2025-01-04 12:00:00',
      },
    ],
    planCounts: 1,
    planList: [
      {
        planId: 1,
        planName: '모각코',
        dateTime: '2025-01-08 13:00:00',
        participants: 2,
        capacity: 10,
        planImagePath: 'https://plan-image.jpg',
        isOpened: false,
        isFulled: true,
      },
    ],
    reviewCounts: 2,
    reviewList: [
      {
        reviewId: 2,
        nickname: '유저1',
        profileImagePath: 'https://user1-image.jpg',
        score: 5,
        comment: '다음에 또 참여하고 싶어요!',
        createdAt: '2025-01-03 12:00:00',
        updatedAt: '2025-01-03 12:00:00',
      },
      {
        reviewId: 1,
        nickname: '유저2',
        profileImagePath: 'https://user2-image.jpg',
        score: 4,
        comment: '즐거운 시간이었습니다~',
        createdAt: '2025-01-03 14:00:00',
        updatedAt: '2025-01-03 14:00:00',
      },
    ],
  },
};

export default function MeetingDetailMain() {
  const { data } = meetingData;
  return (
    <>
      <div className="fixed top-0 h-[70px] w-full bg-slate-400">헤더</div>
      <div className="mt-[70px] flex w-full flex-col gap-5 p-3">
        <Carousel images={images} />
        <div className="flex flex-col gap-1 font-bold">
          <span>모임 정보</span>
          <div className="flex flex-col gap-4 rounded-md bg-[#f6f6f6] p-3">
            <div className="flex w-full justify-between">
              <span>{data.meetingName}</span>
              <DateBadge>{data.category}</DateBadge>
            </div>
            <div>{data.description}</div>
            <div className="flex items-end justify-between">
              <div className="flex-center gap-2">
                <Avatar
                  imageUrl="/assets/icons/calendar.svg"
                  className="h-10 w-10"
                />
                <span>{data.nickname}</span>
              </div>
              <div>
                <div className="flex flex-col text-sm font-semibold text-black-sub">
                  <IconWithCount count={data.memberCount} suffix="명" />
                  <IconWithCount count={data.planCounts} suffix="개" />
                  <IconWithCount count={data.reviewCounts} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <SectionLayout
          onClickViewMore={() => {}}
          title={`멤버 ${data.memberCount}명`}
        >
          <MemberList members={[]} />
        </SectionLayout>
        <SectionLayout onClickViewMore={() => {}} title="다가오는 일정">
          일정 카드 1개
        </SectionLayout>
        <SectionLayout onClickViewMore={() => {}} title="리뷰 목록">
          리뷰리스트
        </SectionLayout>
      </div>
    </>
  );
}
