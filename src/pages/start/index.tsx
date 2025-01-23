import React from 'react';
import Button from '@/components/shared/Button';
import Link from 'next/link';
import LoginBanner from '@/components/auth/login/loginBanner';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/authReducers';
import { clearUser } from '@/redux/authReducers';

const StartPage = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUser());
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white">
      <div className="mb-16">
        <LoginBanner />
      </div>
      <div className="mb-4">
        <Link href={'/plans'}>
          <Button
            text={'비회원으로 시작하기'}
            type="signup"
            textColor="text-primary-10"
          />
        </Link>
      </div>
      <Link href={'/signup'}>
        <Button text={'회원가입'} type="signup" textColor="text-primary-10" />
      </Link>
      <Link href={'/login'}>
        <p className="m-10 mb-4 font-medium text-gray-600">
          이미 가입하셨나요? <span className="underline">로그인하기</span>
        </p>
      </Link>
      <button onClick={handleLogout}>임시 로그아웃 버튼</button>
      <div className="flex gap-4">
        <div className="h-10 w-10 rounded-full bg-gray-300"></div>
        <div className="h-10 w-10 rounded-full bg-yellow-400"></div>
        <div className="h-10 w-10 rounded-full bg-green-500"></div>
      </div>
    </div>
  );
};

export default StartPage;
