import { NextRequest, NextResponse } from 'next/server';

const publicPaths = ['/login'];
const protectedPaths = ['/jobs', '/post'];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const { pathname } = req.nextUrl;


  // ログイン前ページからの遷移制御
  if (!token && protectedPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ログイン後ページからの遷移制御
  if (token && publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/jobs", req.url));
  }

  return NextResponse.next();
}

// matcher を指定して App Router 内のページに適用
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
