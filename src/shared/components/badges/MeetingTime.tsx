import React from 'react';
import Badge from './Badge';

interface MeetingTimeProps {
  dateTime: string;
}

function formatTime(dateString: string): string {
  const dateObj = new Date(dateString);
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function MeetingTime({ dateTime }: MeetingTimeProps) {
  const formattedTime = formatTime(dateTime);
  return <Badge content={formattedTime} />;
}

export default MeetingTime;
