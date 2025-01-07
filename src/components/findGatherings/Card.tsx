/**
 * 디자인 확정 후 수정 필요
 * 임시 카드 컴포넌트
 **/

import React from 'react';
import DeadlineBadge from '../@shared/card-list/DeadlinBadge';
import MeetingDate from '../findGatherings/MeetingDate';
import MeetingTime from '../findGatherings/MeetingTime';

type CardProps = {
  title: string;
  content: string;
  registrationEnd: string;
  dateTime: string;
};

const Card: React.FC<CardProps> = ({
  title,
  content,
  registrationEnd,
  dateTime,
}) => {
  return (
    <div className="relative w-[400px] border rounded-lg shadow-md p-4 m-4">
      {/* 우측 상단에 마감시간 뱃지 */}
      <div className="absolute top-2 right-2">
        <DeadlineBadge registrationEnd={registrationEnd} />
      </div>

      {/* 모임 날짜 / 시간 */}
      <div className="mb-2 flex items-center gap-2">
        <MeetingDate dateTime={dateTime} />
        <MeetingTime dateTime={dateTime} />
      </div>

      {/* 모임 제목 */}
      <h2 className="text-xl font-bold mb-1">{title}</h2>

      {/* 모임 설명 */}
      <p className="text-sm text-gray-600">{content}</p>
    </div>
  );
};

export default Card;
