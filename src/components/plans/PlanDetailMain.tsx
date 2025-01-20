import Carousel from '@/components/shared/Carousel';
import ProgressBar from '@/components/shared/ProgressBar';
import dayjs from 'dayjs';
import AddressMap from '@/components/shared/map/AddressMap';
import { splitAddress } from '@/utils/splitAddress';
import Image from 'next/image';
import DateBadge from '@/components/shared/DateBadge';
import AvatarList from './AvatarList';
import Button from '../shared/Button';
import { PlanDetail } from '@/types/api/plan';
import IconWithCount from '../meetings/ui/IconWithCount';
import {
  EyeIcon,
  HandThumbUpIcon,
  MapPinIcon,
  StarIcon,
  UserIcon,
} from '@heroicons/react/20/solid';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import { useRouter } from 'next/router';
import { formatAverage } from '@/utils/formatRating';

interface PlanDetailMainProps {
  planData: PlanDetail;
  onClickJoinPlan: () => void;
}

export default function PlanDetailMain({
  planData,
  onClickJoinPlan,
}: PlanDetailMainProps) {
  const router = useRouter();
  return (
    <>
      <>
        <div className="flex flex-col gap-20 p-4">
          <div className="flex flex-col justify-center gap-6 overflow-hidden rounded-lg border-[2px] border-[#E5E7EB] pb-5">
            <Carousel images={planData.planImagePath} />
            <div className="flex flex-col gap-3 px-3 pb-[21px] pt-4">
              <div className="flex gap-2">
                <DateBadge>
                  {dayjs(planData.dateTime).format('M월 D일')}
                </DateBadge>
                <DateBadge>
                  {dayjs(planData.dateTime).format('HH:mm')}
                </DateBadge>
              </div>
              <span className="font-bold">{planData.planName}</span>
              <p className="text-sm font-bold">{planData.content}</p>
              <div className="flex w-full items-center justify-end gap-4 text-black-sub">
                <IconWithCount icon={<EyeIcon />} count={planData.viewCount} />
                <IconWithCount
                  icon={<HandThumbUpIcon />}
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
                  <span className="text-sm font-bold">{`현재 인원 ${planData.capacity}명`}</span>
                  <AvatarList users={planData.userList} />
                </div>
                <ProgressBar
                  capacity={planData.capacity}
                  participants={planData.participants}
                />
                <div className="flex w-full justify-between text-xs text-[#374151]">
                  <span>{`최소 인원 5명`}</span>
                  <span>{`최대 인원 ${planData.capacity}명`}</span>
                </div>
              </div>
              <div className="text-sm">
                {`모집 마감일 ${dayjs(planData.registrationEnd).format('YYYY.MM.DD')}`}
              </div>
              <Button
                text={planData.isJoined ? '참석 취소하기' : '일정 참석하기'}
                type="attend"
                onClick={onClickJoinPlan}
                backColor="relative top-5 bg-primary-10 text-white w-full"
              />
            </div>
          </div>

          <div className="flex h-[150px] items-center gap-4 overflow-hidden rounded-lg border-[2px] border-[#E5E7EB] p-4">
            <div className="relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-xl">
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
              <p className="line-clamp-2 overflow-hidden text-ellipsis break-words text-sm">
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
      </>
    </>
  );
}
