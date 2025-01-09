/**
 * 디자인 확정 후 수정 필요, 반응형 추후 수정
 * 임시 카드 컴포넌트
 **/

import React from 'react';
import DeadlineBadge from './DeadlinBadge';
import MeetingDate from '../MeetingDate';
import MeetingTime from '../MeetingTime';

type CardProps = {
  title: string;
  registrationEnd: string;
  dateTime: string;
};

const Card: React.FC<CardProps> = ({ title, registrationEnd, dateTime }) => {
  return (
    <div className="relative w-full rounded-lg border bg-white p-4 shadow-md">
      {/* 우측 상단에 마감시간 뱃지 */}
      <div className="absolute right-2 top-2">
        <DeadlineBadge registrationEnd={registrationEnd} />
      </div>

      {/* 모임 제목 */}
      <h2 className="mb-1 text-xl font-bold">{title}</h2>

      {/* 모임 날짜, 시간 */}
      <div className="mb-2 flex items-center gap-2">
        <MeetingDate dateTime={dateTime} />
        <MeetingTime dateTime={dateTime} />
      </div>
    </div>
  );
};

export default Card;
