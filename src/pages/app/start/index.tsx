import React from 'react';
import Button from '@/shared/components/Button';
import Link from 'next/link';
import LoginBanner from '@/pages/auth/login/ui/loginBanner';
import buttonGoogleImage from '@/shared/assets/images/btnW_google.png';
import buttonKakaoImage from '@/shared/assets/images/btnY_kakao.png';
import buttonNaverImage from '@/shared/assets/images/btnG_naver.png';
import {
  GOOGLE_AUTH_URL,
  NAVER_AUTH_URL,
  KAKAO_AUTH_URL,
} from '@/shared/constants/oAuth';
import SocialLoginButton from './ui/button';

export const StartPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white">
      <div className="mb-16">
        <LoginBanner />
      </div>
      <div className="mb-4">
        <Link href={'/plans'}>
          <Button
            text={'비회원으로 시작하기'}
            size={'large'}
            variant={'outline'}
            width={324}
            height={42}
          />
        </Link>
      </div>
      <Link href={'/register'}>
        <Button text={'회원가입'} size={'large'} width={320} height={42} />
      </Link>
      <div className="mb-[22px] mt-[39px] flex items-center justify-center text-center">
        <p className="font-base mr-2 text-[#6C6C6C]">{'이미 가입하셨나요?'}</p>
        <Link href={'/login'}>
          <span className="text-[#6C6C6C] underline">{'로그인하기'}</span>
        </Link>
      </div>
      <div className="flex gap-[23px]">
        <SocialLoginButton
          authURL={GOOGLE_AUTH_URL}
          buttonImage={buttonGoogleImage}
        />
        <SocialLoginButton
          authURL={KAKAO_AUTH_URL}
          buttonImage={buttonKakaoImage}
        />
        <SocialLoginButton
          authURL={NAVER_AUTH_URL}
          buttonImage={buttonNaverImage}
        />
      </div>
    </div>
  );
};
