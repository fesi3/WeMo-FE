import Carousel from '@/components/shared/Carousel';
import ProgressBar from '@/components/shared/ProgressBar';
import dayjs from 'dayjs';
import AddressMap from '@/components/shared/map/AddressMap';
import { splitAddress } from '@/utils/splitAddress';
import Image from 'next/image';
import DateBadge from '@/components/shared/DateBadge';
import AvatarList from './AvatarList';
import IconWithCount from '../meetingDetail/ui/IconWithCount';
import {
  EyeIcon,
  HeartIcon,
  MapPinIcon,
  StarIcon,
  UserIcon,
} from '@heroicons/react/20/solid';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import { useRouter } from 'next/router';
import { formatAverage } from '@/utils/formatRating';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import usePlanDetailQuery from '@/hooks/usePlanDetailQuery';
import { attendPlan, leavePlan } from '@/api/plan';
import LikePlanButton from './LikePlanButton';
import usePlanLikeMutation from '@/hooks/usePlanLikeMutation';
import PlanAttendButton from './PlanAttendButton';
import { useState } from 'react';

interface PlanDetailMainProps {
  id: number;
}

export default function PlanDetailMain({ id }: PlanDetailMainProps) {
  const router = useRouter();
  const [isLoadingJoin, setIsLoadingJoin] = useState(false); // mutate로 리팩토링
  const { data, isLoading, refetch } = usePlanDetailQuery(id);
  const planData = data?.data;
  const auth = useSelector((state: RootState) => state.auth);
  const { mutate, isPending: isPendingLike } = usePlanLikeMutation({
    planId: id,
    isLiked: planData?.isLiked || false,
  });
  const onClickJoinPlan = async () => {
    if (isLoadingJoin) return;
    setIsLoadingJoin(true);
    if (!auth.isLoggedIn) {
      router.push('/login');
      return;
    }
    //mutation으로 리팩토링링
    try {
      if (!data?.data.isJoined) {
        await attendPlan(id);
      } else {
        await leavePlan(id);
      }
    } finally {
      await refetch();
      setIsLoadingJoin(false);
    }
  };
  const onClickLike = () => {
    if (isPendingLike) return;
    if (auth === null || !auth.isLoggedIn) {
      router.push('/login');
    }
    mutate();
  };
  if (isLoading) return <div>로딩중</div>;
  if (!data || !planData) return <div>데이터 없음</div>;
  return (
    <>
      <>
        <div className="flex flex-col gap-20 p-4">
          <div className="flex flex-col justify-center gap-6 overflow-hidden rounded-lg border-[2px] border-[#E5E7EB] pb-5">
            <Carousel images={planData.planImagePath} />
            <div className="flex flex-col gap-3 px-3 pb-[21px] pt-4">
              <div className="flex w-full justify-between">
                <div className="flex gap-2">
                  <DateBadge>
                    {dayjs(planData.dateTime).format('M월 D일')}
                  </DateBadge>
                  <DateBadge>
                    {dayjs(planData.dateTime).format('HH:mm')}
                  </DateBadge>
                </div>
                <LikePlanButton
                  isLiked={planData.isLiked}
                  onClick={onClickLike}
                />
              </div>
              <span className="font-bold">{planData.planName}</span>
              <p className="text-sm font-bold">{planData.content}</p>
              <div className="flex w-full items-center justify-end gap-4 text-black-sub">
                <IconWithCount icon={<EyeIcon />} count={planData.viewCount} />
                <IconWithCount
                  icon={<HeartIcon />}
                  count={planData.likeCount}
                />
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <MapPinIcon className="h-4 w-4" />
                <span className="font-bold">{`${splitAddress(planData.address).neighborhood}`}</span>
              </div>
              <AddressMap
                latitude={planData.latitude}
                longitude={planData.longitude}
              />
              <div className="flex flex-col items-center gap-2 pt-5">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold">{`현재 인원 ${planData.participants}명`}</span>
                  <AvatarList users={planData.userList} />
                </div>
                <ProgressBar
                  capacity={planData.capacity}
                  participants={planData.participants}
                />
                <div className="flex w-full justify-between text-xs text-[#374151]">
                  <span>{`최소 인원 3명`}</span>
                  <span>{`최대 인원 ${planData.capacity}명`}</span>
                </div>
              </div>
              <div className="text-sm">
                {`모집 마감일 ${dayjs(planData.registrationEnd).format('YYYY.MM.DD')}`}
              </div>
              <PlanAttendButton
                isFulled={planData.isFulled}
                isJoined={planData.isJoined}
                isHost={auth.user?.email === planData.email}
                onClick={onClickJoinPlan}
                isLoading={isLoadingJoin}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold">모임 정보</span>
            <div className="flex items-center gap-4 overflow-hidden rounded-lg border-[2px] border-[#E5E7EB] p-4">
              <div className="relative aspect-[5/3] w-[30%] shrink-0 overflow-hidden rounded-xl">
                <Image
                  sizes="20vw"
                  src={planData.meetingInfo.meetingImagePath}
                  alt="모임 이미지"
                  fill
                  priority
                />
              </div>
              <div className="flex h-full w-full flex-col gap-5 overflow-hidden">
                <div className="flex w-full items-center justify-between">
                  <span className="font-bold">
                    {planData.meetingInfo.meetingName}
                  </span>
                  <button
                    className="p-2"
                    onClick={() =>
                      router.push(`/meetings/${planData.meetingInfo.meetingId}`)
                    }
                  >
                    <ArrowLeft className="rotate-180" />
                  </button>
                </div>
                <p className="line-clamp-3 text-sm/4">
                  {planData.meetingInfo.description}
                </p>
                <div className="flex gap-3 text-black-sub">
                  <IconWithCount
                    icon={<UserIcon />}
                    count={planData.meetingInfo.memberCount}
                  />
                  <IconWithCount
                    icon={<StarIcon />}
                    count={formatAverage(planData.meetingInfo.reviewAverage)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
