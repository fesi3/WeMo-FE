import React from 'react';

interface BadgeProps {
  content: string;
  className?: string;
}

function Badge({ content, className }: BadgeProps) {
  return (
    <span
      className={`rounded-md bg-gray-500 p-1 text-sm text-white ${className || ''}`}
    >
      {content}
    </span>
  );
}

export default Badge;
