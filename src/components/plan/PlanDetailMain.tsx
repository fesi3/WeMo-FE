import { PlanData, User } from '../types/api/plan';

import Carousel from '@/components/shared/Carousel';
import ProgressBar from '@/components/shared/ProgressBar';
import dayjs from 'dayjs';
import AddressMap from '@/components/shared/map/AddressMap';
import { splitAddress } from '@/utils/splitAddress';
import Image from 'next/image';
import DateBadge from '@/components/shared/DateBadge';
import eyeIcon from '@/assets/icons/eye.svg';
import thumbUpIcon from '@/assets/icons/thumb_up.svg';
import locationMarker from '@/assets/icons/location_marker.svg';
import AvatarList from '@/components/shared/avatar/AvatarList';
import { useEffect, useState } from 'react';
import Button from '../shared/Button';

interface PlanDetailMainProps {
  planData: PlanData | undefined | null;
}

export default function PlanDetailMain({ planData }: PlanDetailMainProps) {
  const [mockImageArr, setMockImageArr] = useState<string[]>([]);
  const [mockAvatars, setMockAvatars] = useState<User[]>([]);

  useEffect(() => {
    if (planData) {
      setMockImageArr([
        planData.planImagePath,
        planData.planImagePath,
        planData.planImagePath,
      ]);
      setMockAvatars([
        {
          nickname: 'nickname',
          profileImagePath: planData.planImagePath,
          createdAt: 'createdAt',
        },
        {
          nickname: 'nickname2',
          profileImagePath: planData.planImagePath,
          createdAt: 'createdAt',
        },
        {
          nickname: 'nickname3',
          profileImagePath: planData.planImagePath,
          createdAt: 'createdAt',
        },
        {
          nickname: 'nickname4',
          profileImagePath: planData.planImagePath,
          createdAt: 'createdAt',
        },
        {
          nickname: 'nickname5',
          profileImagePath: planData.planImagePath,
          createdAt: 'createdAt',
        },
      ]);
    }
  }, [planData]);

  return (
    <>
      {!!planData && (
        <>
          <div className="h-12 bg-gray-400">헤더영역</div>
          <div className="flex flex-col gap-10 p-4">
            <div className="flex flex-col justify-center gap-4 overflow-hidden rounded-lg border-[2px] border-[#E5E7EB] pb-5">
              <Carousel images={mockImageArr} />
              <div className="flex flex-col gap-2 px-3 pb-[21px] pt-4">
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
                <div className="flex w-full items-center justify-end gap-4">
                  <div className="flex items-center gap-1">
                    <Image
                      src={eyeIcon}
                      width={20}
                      height={20}
                      alt="조회수 아이콘"
                    />
                    <span className="text-xs font-bold text-black-sub">
                      123
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image
                      src={thumbUpIcon}
                      width={20}
                      height={20}
                      alt="추천수 아이콘"
                    />
                    <span className="text-xs font-bold text-black-sub">
                      123
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Image
                    src={locationMarker}
                    width={14}
                    height={20}
                    alt="추천수 아이콘"
                  />
                  <span className="text-xs font-bold text-black-sub">{`${splitAddress(planData.address).neighborhood}`}</span>
                </div>
                <AddressMap
                  latitude={planData.latitude}
                  longitude={planData.longitude}
                />
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold">{`현재 인원 ${planData.capacity}명`}</span>
                    <AvatarList users={mockAvatars} />
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
                  text="일정 참석하기"
                  type="attend"
                  backColor="relative top-5 bg-primary-10 text-white w-full"
                />
              </div>
            </div>

            <div className="flex h-[150px] items-center gap-4 overflow-hidden rounded-lg border-[2px] border-[#E5E7EB] p-4">
              <div className="relative h-[100px] w-[100px] shrink-0 rounded-xl">
                <Image
                  sizes="20vw"
                  src={planData.planImagePath}
                  alt="모임 이미지"
                  fill
                  loading="lazy"
                />
              </div>
              <div className="flex h-full flex-col gap-5 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="font-bold">모임 제목</span>
                  <span className="font-bold">{'>'}</span>
                </div>
                <p className="line-clamp-3 overflow-hidden text-ellipsis break-words text-sm">
                  모임내용1234모임내용1234모임내용1234모임내용1234모임내용1234모임내용1234모임내용1234모임내용1234모임내용1234모임내용1234모임내용1234모임내용1234
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
