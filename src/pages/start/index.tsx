import React from 'react';
import Button from '@/components/shared/Button';

const StartPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white">
      <Button text={'비회원으로 시작하기'} type={'start'} />
      <button className="mb-6 h-12 w-72 rounded-lg bg-teal-500 font-bold text-white">
        회원 가입
      </button>
      <p className="mb-4 font-medium text-gray-600">
        이미 가입하셨나요? <span className="underline">로그인하기</span>
      </p>
      <div className="flex gap-4">
        <div className="h-10 w-10 rounded-full bg-gray-300"></div>
        <div className="h-10 w-10 rounded-full bg-yellow-400"></div>
        <div className="h-10 w-10 rounded-full bg-green-500"></div>
      </div>
    </div>
  );
};

export default StartPage;
