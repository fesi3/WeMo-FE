/**
 * 디자인 확정 후 수정 필요
 * 임시 카드 컴포넌트
 **/

import React from 'react';
import DeadlineBadge from '../@shared/card-list/DeadlinBadge';

type CardProps = {
  title: string;
  content: string;
  registrationEnd: string;
};

const Card: React.FC<CardProps> = ({ title, content, registrationEnd }) => {
  return (
    <div className="relative border rounded-lg shadow-md p-4">
      /* 마감 시간 뱃지 */
      {registrationEnd && (
        <div className="absolute top-2 right-2">
          <DeadlineBadge registrationEnd={registrationEnd} />
        </div>
      )}
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-600">{content}</p>
    </div>
  );
};

export default Card;
