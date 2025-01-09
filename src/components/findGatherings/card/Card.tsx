/**
 * 디자인 확정 후 수정 필요, 반응형 추후 수정
 * 임시 카드 컴포넌트
 **/

import React from 'react';
import DeadlineBadge from './DeadlinBadge';
import MeetingDate from '../MeetingDate';
import MeetingTime from '../MeetingTime';

//타입 파일 따로 생성하면, 불러오도록 수정
type CardProps = {
  title: string;
  registrationEnd: string;
  dateTime: string;
  meetingName: string;
  province: string;
  district: string;
  participants: string;
  capacity: string;
  isOpened: boolean;
  isLiked: boolean;
};

const Card: React.FC<CardProps> = ({
  title,
  registrationEnd,
  dateTime,
  meetingName,
  province,
  district,
  participants,
  capacity,
  isOpened,
  isLiked,
}) => {
  return (
    <div className="relative w-full rounded-lg border bg-white p-4 shadow-md">
      {/* 우측 상단에 마감시간 뱃지 */}
      <div className="absolute right-2 top-2">
        <DeadlineBadge registrationEnd={registrationEnd} />
      </div>

      {/* 모임 제목 */}
      <h2 className="mb-1 text-xl font-bold text-black">{title}</h2>

      {/* 모임 상세 정보 */}
      <div className="mb-2">
        {/* 모임 이름 */}
        <p className="text-sm text-gray-600">모임 이름: {meetingName}</p>

        {/* 장소 */}
        <p className="text-sm text-gray-600">
          장소: {province}, {district}
        </p>
      </div>

      {/* 날짜 및 시간 */}
      <div className="mb-2 flex items-center gap-2">
        <MeetingDate dateTime={dateTime} />
        <MeetingTime dateTime={dateTime} />
      </div>

      {/* 참여자 수 / 정원 */}
      <div className="mb-2 text-sm text-gray-600">
        {`참여자: ${participants} / ${capacity}`}
      </div>

      {/* 개설 확정 여부 */}
      <div className="mb-2 text-sm text-gray-600">
        {isOpened ? '개설 확정됨' : '개설 미확정'}
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
