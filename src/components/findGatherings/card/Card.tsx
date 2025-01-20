import React from 'react';
import { useRouter } from 'next/router';
import DeadlineBadge from './DeadlinBadge';
import MeetingDate from '../../shared/badges/MeetingDate';
import MeetingTime from '../../shared/badges/MeetingTime';
import DistrictBadge from '@/components/shared/badges/DistrictBadge';
import LikeButton from '../LikeButton';
import { PlanData } from '@/types/plans';

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
    router.push(`/meetings/plans/${planId}`);
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
      <div className="relative h-48 w-full">
        <img
          src={planImagePath}
          alt={planName}
          className={`h-full w-full object-cover ${
            isFulled ? 'opacity-50' : ''
          }`}
        />
        {/* 찜 버튼 */}
        <div className="absolute bottom-2 right-2">
          <LikeButton planId={planId} initialIsLiked={isLiked} />
        </div>

        {/* 마감 뱃지 */}
        <div className="absolute bottom-2 left-2">
          <DeadlineBadge registrationEnd={registrationEnd} />
        </div>
      </div>

      {/* 카드 내용 */}
      {/* 날짜 뱃지 및 장소 */}
      <div className="mb-0 flex items-center gap-2 p-2">
        <MeetingDate dateTime={dateTime} />
        <MeetingTime dateTime={dateTime} />
        <DistrictBadge district={district} />
      </div>
      <div className="p-2 pt-0">
        {/* 일정 제목 */}
        <h2 className="mb-1 text-xl font-bold text-black">{planName}</h2>

        {/* 모임 상세 정보 */}
        <div className="mb-2">
          {/* 모임 이름 */}
          <p className="text-sm text-gray-600">{meetingName}</p>
        </div>

        {/* 참여자 수 / 정원 */}
        <div className="mb-2 text-sm text-gray-600">
          {` ${participants} / ${capacity}`}
        </div>

        {/* 개설 확정 여부 */}
        <div className="mb-2 text-sm text-gray-600">
          {isOpened ? '개설 확정' : '개설 미확정'}
        </div>
      </div>
    </div>
  );
};

export default Card;
