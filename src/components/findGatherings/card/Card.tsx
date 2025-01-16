/**
 * 디자인 확정 후 수정 필요, 반응형 추후 수정
 * 임시 카드 컴포넌트
 **/

import React from 'react';
import DeadlineBadge from './DeadlinBadge';
import MeetingDate from '../../shared/badges/MeetingDate';
import MeetingTime from '../../shared/badges/MeetingTime';
import { PlanData } from '@/components/types/plans';

const Card: React.FC<PlanData> = ({
  planName,
  registrationEnd,
  dateTime,
  meetingName,
  province,
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
        {/* 날짜/시간/마감정보 뱃지지 */}
        <div className="absolute left-2 top-2 flex gap-2">
          <MeetingDate dateTime={dateTime} />
          <MeetingTime dateTime={dateTime} />
        </div>
        <div className="absolute right-2 top-2">
          <DeadlineBadge registrationEnd={registrationEnd} />
        </div>
      </div>

      {/* 카드 내용 */}
      <div className="p-4">
        {/* 일정 제목목 */}
        <h2 className="mb-1 text-xl font-bold text-black">{planName}</h2>

        {/* 모임 상세 정보 */}
        <div className="mb-2">
          {/* 모임 이름 */}
          <p className="text-sm text-gray-600">모임: {meetingName}</p>

          {/* 장소 */}
          <p className="text-sm text-gray-600">
            {province}, {district}
          </p>
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

      {/* 찜 버튼 */}
      <div className="absolute bottom-2 right-2">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full border ${
            isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-400'
          }`}
        >
          ♥
        </div>
      </div>
    </div>
  );
};

export default Card;
