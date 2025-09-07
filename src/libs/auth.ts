import Cookies from "js-cookie";

interface Tokens {
  accessToken: string;
  refreshToken?: string;
}

interface TokenPayload {
  sub: string;
  iat: number;
  exp: number;
}

export function setTokens(tokens: Tokens) {
  console.log("토큰 저장 시도:", tokens);
  console.log("액세스 토큰:", tokens.accessToken);

  if (!tokens.accessToken) {
    console.error("액세스 토큰이 없습니다!");
    return;
  }

  Cookies.set("ACCESS_TOKEN", tokens.accessToken);
  console.log("ACCESS_TOKEN 쿠키 저장 완료");

  if (tokens.refreshToken) {
    Cookies.set("REFRESH_TOKEN", tokens.refreshToken);
    console.log("REFRESH_TOKEN 쿠키 저장 완료");
  }
}
export function clearTokens() {
  Cookies.remove("ACCESS_TOKEN");
  Cookies.remove("REFRESH_TOKEN");
}

export function getToken(): string | null {
  const token = Cookies.get("ACCESS_TOKEN");
  console.log("쿠키에서 토큰 읽기:", token);
  return token || null;
}

export function isTokenValid(token?: string): boolean {
  const tokenToCheck = token || getToken();
  if (!tokenToCheck) return false;

  try {
    const parts = tokenToCheck.split(".");
    if (parts.length !== 3) return false;

    const payload: TokenPayload = JSON.parse(atob(parts[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    return payload.exp > currentTime;
  } catch (error) {
    console.error("토큰 검증 실패:", error);
    return false;
  }
}

export function getTokenPayload(token?: string): TokenPayload | null {
  const tokenToCheck = token || getToken();
  if (!tokenToCheck) return null;

  try {
    const parts = tokenToCheck.split(".");
    if (parts.length !== 3) return null;

    return JSON.parse(atob(parts[1]));
  } catch (error) {
    console.error("토큰 파싱 실패:", error);
    return null;
  }
}

export function getUserId(): string | null {
  const payload = getTokenPayload();
  return payload?.sub || null;
}
