import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import DeadlineBadge from './DeadlinBadge';
import MeetingDate from '@/shared/components/badges/MeetingDate';
import MeetingTime from '@/shared/components/badges/MeetingTime';
import DistrictBadge from '@/shared/components/badges/DistrictBadge';
import LikeButton from '../LikeButton';
import { PlanData } from '@/shared/types/plans';

const Card: React.FC<PlanData> = ({
  planId,
  planName,
  registrationEnd,
  dateTime,
  meetingName,
  district,
  participants,
  capacity,
  isOpened,
  isLiked,
  isFulled,
  planImagePath,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/plans/${planId}`);
  };

  return (
    <div
      className={`relative w-full cursor-pointer overflow-hidden rounded-lg border bg-white shadow-md transition-all ${
        isFulled ? 'cursor-default' : 'hover:border-2 hover:border-primary-50'
      }`}
      onClick={handleClick}
    >
      {/* 반투명 오버레이 */}
      {isFulled && (
        <div className="absolute inset-0 bg-gray-500 bg-opacity-50"></div>
      )}
      {/* 이미지 */}
      <div className="relative aspect-[5/3] w-full">
        <Image
          src={planImagePath}
          alt={planName}
          fill
          priority
          fetchPriority="high"
          loading="eager"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className={`h-full w-full object-contain ${isFulled ? 'opacity-50' : ''}`}
        />
        {/* 찜 버튼 */}
        {/* <div className="absolute bottom-2 right-2">
          <LikeButton planId={planId} initialIsLiked={isLiked} />
        </div> */}
        {/* 개설 확정 여부 */}
        <div className="absolute bottom-2 right-2">
          {isOpened ? (
            <span className="whitespace-nowrap rounded-lg border border-primary-10 bg-white px-2 py-1 text-xs font-semibold text-primary-10">
              개설 확정
            </span>
          ) : null}
        </div>

        {/* 마감 뱃지 */}
        <div className="absolute bottom-2 left-2">
          <DeadlineBadge registrationEnd={registrationEnd} />
        </div>
      </div>

      {/* 카드 내용 */}
      {/* 날짜 뱃지 및 장소 */}
      <div className="mb-0 flex items-center justify-between p-2">
        <div className="flex items-center gap-2">
          <MeetingDate dateTime={dateTime} />
          <MeetingTime dateTime={dateTime} />
          <DistrictBadge district={district} />
        </div>

        {/* 찜 버튼 이동 */}
        <div className="ml-2 mt-2">
          <LikeButton planId={planId} initialIsLiked={isLiked} />
        </div>
      </div>

      <div className="p-2 pt-0">
        <div className="mb-2 flex items-center gap-4">
          {/* 일정 제목 */}
          <h2 className="mb-1 text-xl font-bold text-black">{planName}</h2>
        </div>

        <div className="mb-2 flex items-center gap-2">
          {/* 모임 이름 */}
          <p className="text-sm text-gray-600">{meetingName}</p>
          {/* 참여자 수 / 정원 */}
          <div className="text-sm text-gray-600">
            {`(${participants} / ${capacity})`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
