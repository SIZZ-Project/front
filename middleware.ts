import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isTokenValid } from "./src/libs/auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 정적 파일과 API 라우트는 제외
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 인증이 필요한 라우트
  const protectedRoutes = ["/myProfile", "/settings"];

  // 인증된 사용자가 접근하면 안 되는 라우트
  const authRoutes = ["/signin", "/signup"];

  // 쿠키에서 토큰 확인
  const token = request.cookies.get("ACCESS_TOKEN")?.value;

  const isAuthenticated = token ? isTokenValid(token) : false;

  // 인증된 사용자가 로그인/회원가입 페이지에 접근하는 경우
  if (
    isAuthenticated &&
    authRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 인증되지 않은 사용자가 보호된 라우트에 접근하는 경우
  if (
    !isAuthenticated &&
    protectedRoutes.some((route) => pathname.startsWith(route))
  ) {
    const redirectUrl = new URL("/signin", request.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
