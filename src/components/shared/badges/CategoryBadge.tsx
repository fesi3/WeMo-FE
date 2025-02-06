import React from 'react';

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <div className={className}>
      <span className="whitespace-nowrap rounded-xl bg-primary-30 p-1 px-2 text-xs text-white">
        {category}
      </span>
    </div>
  );
}

export default CategoryBadge;
