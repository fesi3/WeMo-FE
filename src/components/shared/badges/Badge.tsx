import React from 'react';

interface BadgeProps {
  content: string;
  className?: string;
}

function Badge({ content, className }: BadgeProps) {
  return (
    <span
      className={`whitespace-nowrap rounded-md bg-gray-500 p-1 px-2 text-xs text-white ${className || ''}`}
    >
      {content}
    </span>
  );
}

export default Badge;
