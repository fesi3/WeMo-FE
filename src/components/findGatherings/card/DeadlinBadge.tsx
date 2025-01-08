import React from 'react';

type DeadlineBadgeProps = {
  registrationEnd: string; //마감 시간 문자열
};

const DeadlineBadge: React.FC<DeadlineBadgeProps> = ({ registrationEnd }) => {
  // 마감 일시를 Date 객체로 변환
  const endDate = new Date(registrationEnd);
  // 현재 시각
  const now = new Date();

  // endDate가 이미 지났다면 '마감되었습니다' 표시
  if (endDate.getTime() < now.getTime()) {
    return (
      <div className="rounded-md bg-gray-400 px-2 py-1 text-sm text-white">
        마감되었습니다
      </div>
    );
  }

  // 아직 마감 전이라면, 예: "오늘 12시 마감" 형태로 표시
  // 정확한 '오늘' 판단은 생략
  const hours = endDate.getHours();
  return (
    <div className="rounded-md bg-orange-500 px-2 py-1 text-sm text-white">
      오늘 {hours}시 마감
    </div>
  );
};

export default DeadlineBadge;
