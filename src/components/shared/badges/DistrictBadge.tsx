import React from 'react';

interface DistrictBadgeProps {
  district: string;
}

const DistrictBadge: React.FC<DistrictBadgeProps> = ({ district }) => {
  return (
    <div className="rounded-md bg-gray-500 p-1 text-sm text-white">
      {district}
    </div>
  );
};

export default DistrictBadge;
