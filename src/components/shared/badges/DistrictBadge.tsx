import React from 'react';
import Badge from './Badge';

interface DistrictBadgeProps {
  district: string;
}

function DistrictBadge({ district }: DistrictBadgeProps) {
  return <Badge content={district} />;
}

export default DistrictBadge;
