import React from 'react';

const Greeting: React.FC = () => {
  return (
    <div className="mb-4 space-y-2">
      <p className="text-base font-bold">사용자 이름</p>
      {/* 추후 사용자 이름 전역상태로 받아오기 */}
      <p className="text-sm text-gray-500">
        안녕하세요! 오늘은 어떤 모임을 찾으시나요?
      </p>
    </div>
  );
};

export default Greeting;
