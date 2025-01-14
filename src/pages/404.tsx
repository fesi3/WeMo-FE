import Link from 'next/link';
import React from 'react';

function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <div className="mb-6 flex h-40 w-40 flex-col items-center justify-center rounded-full bg-[#00B6AD]">
        <span className="text-4xl font-bold text-white">404</span>
      </div>

      <h1 className="mb-4 text-2xl font-bold text-gray-800">
        페이지를 찾을 수 없음
      </h1>
      <p className="mb-6 text-center text-gray-600">
        찾으시는 페이지는 존재하지 않습니다. 홈으로 이동해주세요. <br />
        <span className="opacity-40">
          알고 계셨나요? WeMo를 대표하는 색상은{' '}
        </span>
        <span className="font-bold text-[#00B6AD]">#00B6AD</span>
        <span className="opacity-40">이랍니다.</span>
      </p>

      <Link href={'/'}>
        <button className="rounded-lg bg-[#00B6AD] px-6 py-2 font-medium text-white hover:bg-[#009c96]">
          홈으로 돌아기기
        </button>
      </Link>
    </div>
  );
}

export default NotFound;
