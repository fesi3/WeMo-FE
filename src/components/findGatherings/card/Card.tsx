/**
 * 디자인 확정 후 수정 필요, 반응형 추후 수정
 * 임시 카드 컴포넌트
 **/

import React from 'react';
import DeadlineBadge from './DeadlinBadge';
import MeetingDate from '../../shared/badges/MeetingDate';
import MeetingTime from '../../shared/badges/MeetingTime';
import DistrictBadge from '@/components/shared/badges/DistrictBadge';
import { PlanData } from '@/components/types/plans';

const Card: React.FC<PlanData> = ({
  planName,
  registrationEnd,
  dateTime,
  meetingName,
  district,
  participants,
  capacity,
  isOpened,
  isLiked,
  planImagePath,
}) => {
  return (
    <div className="relative w-full overflow-hidden rounded-lg border bg-white shadow-md">
      {/* 이미지 */}
      <div className="relative h-48 w-full">
        <img
          src={planImagePath}
          alt={planName}
          className="h-full w-full object-cover"
        />
        {/* 찜 버튼 */}
        <div className="absolute right-2 top-2">
          <img
            src={
              isLiked
                ? '/assets/icons/heart.svg'
                : '/assets/icons/emptyHeart.svg'
            }
            alt="찜 버튼"
            className="h-8 w-8"
          />
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
