import Button from '@/components/shared/Button';
import Link from 'next/link';
import React from 'react';

function InternalServerError() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <div className="mb-6 flex h-40 w-40 items-center justify-center rounded-full bg-[#00B6AD]">
        <span className="text-4xl font-bold text-white">{'500'}</span>
      </div>

      <h1 className="mb-4 text-2xl font-bold text-gray-800">{'서버 에러'}</h1>
      <p className="mb-6 text-center text-gray-600">
        {'문제가 발생했습니다. 잠시 후에 다시 시도해주세요. '} <br />
      </p>

      <Link href={'/plans'}>
        <Button text="Back to Homepage" className="px-6 py-2" />
      </Link>
    </div>
  );
}

export default InternalServerError;
