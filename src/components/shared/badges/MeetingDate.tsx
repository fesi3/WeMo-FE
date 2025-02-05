import React from 'react';
import Badge from './Badge';

interface MeetingDateProps {
  dateTime: string;
}

function formatDate(dateString: string): string {
  const dateObj = new Date(dateString);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  return `${month}월 ${day}일`;
}

function MeetingDate({ dateTime }: MeetingDateProps) {
  const formattedDate = formatDate(dateTime);
  return <Badge content={formattedDate} />;
}

export default MeetingDate;
