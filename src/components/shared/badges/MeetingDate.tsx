import React from 'react';

type MeetingDateProps = {
  dateTime: string;
};

function formatDate(dateString: string) {
  // "2025-01-15T17:00:00" → "1월 15일"
  const dateObj = new Date(dateString);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  return `${month}월 ${day}일`;
}

const MeetingDate: React.FC<MeetingDateProps> = ({ dateTime }) => {
  const formatted = formatDate(dateTime);
  return (
    <span className="rounded bg-primary-10 text-sm text-white">
      {formatted}
    </span>
  );
};

export default MeetingDate;
