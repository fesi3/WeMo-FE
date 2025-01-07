import React from 'react';

type DeadlineBadgeProps = {
  deadlineText: string; //마감 시간 문자열
};

const DeadlineBadge: React.FC<DeadlineBadgeProps> = ({ deadlineText }) => {
  return (
    <div className="inline-block bg-orange-500 text-white text-sm py-1 px-2 rounded-md">
      {deadlineText}
    </div>
  );
};

export default DeadlineBadge;
