import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isTokenValid } from "./libs/auth";

// 인증이 필요한 경로들
const protectedRoutes = [
  "/myProfile",
  "/settings",
  // 필요에 따라 추가 경로들을 여기에 추가
];

// 인증이 필요하지 않은 경로들 (로그인, 회원가입 등)
// 이미 로그인된 사용자는 이 경로들에 접근할 수 없음
const authRoutes = ["/signin", "/signup"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get(
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY || "ACCESS_TOKEN"
  )?.value;

  // 정적 파일이나 API 경로는 제외
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 인증이 필요한 경로인지 확인
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // 토큰이 있는지 확인
  const hasValidToken = accessToken && isTokenValid(accessToken);

  // 1. 로그인/회원가입 페이지에 접근하는 경우 (우선 처리)
  if (isAuthRoute) {
    if (hasValidToken) {
      // 이미 로그인되어 있으면 홈으로 리다이렉트
      console.log("이미 로그인된 사용자가 인증 페이지 접근 시도:", pathname);
      return NextResponse.redirect(new URL("/", request.url));
    }
    // 로그인되지 않은 사용자는 인증 페이지 접근 허용
    return NextResponse.next();
  }

  // 2. 인증이 필요한 경로에 접근하는 경우
  if (isProtectedRoute) {
    if (!hasValidToken) {
      // 토큰이 없거나 유효하지 않으면 로그인 페이지로 리다이렉트
      console.log("인증이 필요한 페이지 접근 시도 (미인증):", pathname);
      const loginUrl = new URL("/signin", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    // 유효한 토큰이 있으면 접근 허용
    return NextResponse.next();
  }

  return NextResponse.next();
}

// middleware가 실행될 경로 설정
export const config = {
  matcher: [
    /*
     * 다음 경로들을 제외한 모든 경로에서 middleware 실행:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
