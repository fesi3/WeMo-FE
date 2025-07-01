import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPaths = ['/user'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 보호 경로 확인
  if (!protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // 토큰 취득
  const token = request.cookies.get('accessToken');

  // 토큰 없으면 로그인 페이지 이동
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/user/:path*'],
};