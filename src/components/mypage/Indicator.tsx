import React from 'react';

type ReviewStatus = 'pending' | 'confirmed' | 'available';

interface StatusIndicatorProps {
  currentStatus: ReviewStatus;
}

const StatusIndicator = ({ currentStatus }: StatusIndicatorProps) => {
  const statuses: { label: string; key: ReviewStatus }[] = [
    { label: '개설 대기', key: 'pending' },
    { label: '개설 확정', key: 'confirmed' },
    { label: '이용 예정', key: 'available' },
  ];

  return (
    <div className="flex items-center">
      {statuses.map((status, index) => {
        const isActive = currentStatus === status.key;
        const isCompleted =
          statuses.findIndex((s) => s.key === currentStatus) >= index;

        return (
          <React.Fragment key={status.key}>
            {/* 원형 */}
            <div className="flex flex-col items-center">
              <div
                className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                  isCompleted
                    ? 'border-primary-10 bg-primary-10 text-white'
                    : 'border-gray-300 bg-white text-gray-500'
                }`}
              >
                {isCompleted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="h-2 w-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span className="text-[10px] font-semibold">{index + 1}</span>
                )}
              </div>
              {/* 텍스트 */}
              <span
                className={`mt-1 text-[10px] ${
                  isActive ? 'font-medium text-primary-10' : 'text-gray-500'
                }`}
              >
                {status.label}
              </span>
            </div>
            {/* 연결 라인 */}
            {index < statuses.length - 1 && (
              <div
                className={`mx-1 h-0.5 flex-1 ${
                  isCompleted ? 'bg-primary-10' : 'bg-gray-300'
                }`}
              ></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StatusIndicator;
