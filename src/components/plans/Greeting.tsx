import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface GreetingProps {
  className?: string;
}

const Greeting = ({ className }: GreetingProps) => {
  // Redux에서 유저 데이터 가져오기
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);

  const nickname =
    isLoggedIn && user ? user.nickname : '아직 로그인을 하지 않았어요!';
  const message = isLoggedIn
    ? '안녕하세요! 오늘은 어떤 모임을 찾으시나요?'
    : '모임에 참여하려면 로그인이 필요해요.';

  return (
    <div className={`space-y-2 ${className || ''}`.trim()}>
      <div className="bg-primary-95 px-4 py-8">
        <p className="text-xl font-bold">{nickname} 님 </p>
        <p className="py-2 text-sm text-gray-400">{message}</p>
      </div>
    </div>
  );
};
export default Greeting;
