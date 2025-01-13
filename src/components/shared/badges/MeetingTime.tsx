import React from 'react';

type MeetingTimeProps = {
  dateTime: string;
};

function formatTime(dateString: string) {
  // "2025-01-15T17:00:00" → "17:00"
  const dateObj = new Date(dateString);
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

const MeetingTime: React.FC<MeetingTimeProps> = ({ dateTime }) => {
  const time = formatTime(dateTime);
  return <span className="rounded bg-white text-sm text-gray-600">{time}</span>;
};

export default MeetingTime;
