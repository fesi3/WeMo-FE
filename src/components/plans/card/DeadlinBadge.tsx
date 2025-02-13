import React from 'react';

type DeadlineBadgeProps = {
  registrationEnd: string;
};

const DeadlineBadge: React.FC<DeadlineBadgeProps> = ({ registrationEnd }) => {
  const endDate = new Date(registrationEnd);
  const now = new Date();

  const isToday =
    now.getFullYear() === endDate.getFullYear() &&
    now.getMonth() === endDate.getMonth() &&
    now.getDate() === endDate.getDate();

  if (isToday) {
    // 오늘이면서 이미 마감 시각이 지남 -> 마감 표시
    if (endDate.getTime() < now.getTime()) {
      return (
        <div className="rounded-lg bg-gray-400 px-2 py-1 text-sm text-white">
          마감되었습니다
        </div>
      );
    }
    // 오늘이고 아직 마감 시간이 안 지남-> 마감 뱃지 띄움
    const hours = endDate.getHours();
    return (
      <div className="rounded-xl bg-primary-40 px-2 py-1 text-sm text-white">
        오늘 {hours}시 마감
      </div>
    );
  }
  // 오늘이 아닌 경우
  // 이미 지난 날짜라면 "마감되었습니다", 아니라면 표시하지 않음
  else if (endDate.getTime() < now.getTime()) {
    return (
      <div className="rounded-xl bg-gray-400 px-2 py-1 text-sm text-white">
        마감되었습니다
      </div>
    );
  } else {
    // 아직 날짜가 남았지만 오늘이 아니면 뱃지 표시 안 함
    return null;
  }
};

export default DeadlineBadge;
