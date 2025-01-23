import React from 'react';

interface GreetingProps {
  className?: string;
}

const Greeting = ({ className }: GreetingProps) => {
  return (
    <div className={`space-y-2 ${className || ''}`.trim()}>
      <div className="bg-primary-95 py-4">
        {/* 전달된 className을 병합 */}
        <p className="text-base font-bold">사용자 이름</p>
        {/* 추후 사용자 이름 전역상태로 받아오기 */}
        <p className="text-sm text-gray-500">
          안녕하세요! 오늘은 어떤 모임을 찾으시나요?
        </p>
      </div>
    </div>
  );
};

export default Greeting;
