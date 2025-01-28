import React from 'react';
import Button from '@/components/shared/Button';
import Link from 'next/link';
import LoginBanner from '@/components/auth/login/loginBanner';
import ButtonGoogle from '@/components/auth/login/oAuth/button/buttonGoogle';
import ButtonKakao from '@/components/auth/login/oAuth/button/buttonKakao';
import ButtonNaver from '@/components/auth/login/oAuth/button/buttonNaver';

const StartPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white">
      <div className="mb-16">
        <LoginBanner />
      </div>
      <div className="mb-4">
        <Link href={'/plans'}>
          <button className="h-[42px] w-[324px] rounded-[8px] border-[1px] border-primary-10 font-normal text-primary-10 hover:bg-primary-30 hover:bg-opacity-10">
            {'비회원으로 시작하기'}
          </button>
        </Link>
      </div>
      <Link href={'/signup'} rel="noopener noreferrer" target="_blank">
        <Button text={'회원가입'} type="signup" textColor="text-primary-10" />
      </Link>
      <div className="mb-[22px] mt-[39px] flex items-center justify-center text-center">
        <p className="mr-2 font-medium text-gray-600">이미 가입하셨나요?</p>
        <Link href={'/login'}>
          <span className="text-gray-600 underline">로그인하기</span>
        </Link>
      </div>
      <div className="flex gap-[23px]">
        <ButtonGoogle />
        <ButtonKakao />
        <ButtonNaver />
      </div>
    </div>
  );
};

export default StartPage;
