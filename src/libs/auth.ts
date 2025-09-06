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
  Cookies.set(
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY ?? "ACCESS_TOKEN",
    tokens.accessToken
  );
  if (tokens.refreshToken) {
    Cookies.set(
      process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY ?? "REFRESH_TOKEN",
      tokens.refreshToken
    );
  }
}
export function clearTokens() {
  Cookies.remove(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY ?? "ACCESS_TOKEN");
  Cookies.remove(process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY ?? "REFRESH_TOKEN");
}

export function getToken(): string | null {
  return (
    Cookies.get(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY ?? "ACCESS_TOKEN") ||
    null
  );
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
