import {
  AuthRequest,
  LoginRequest,
  LoginResponse,
  SignupResponse,
} from "@/type";
import BaseApiClient, { Tokens } from "./BaseApiClient";
import { setTokens } from "@/libs/auth";

class AuthApiClient extends BaseApiClient {
  private static instance: AuthApiClient;

  public constructor(tokens?: Tokens) {
    super(process.env.NEXT_PUBLIC_API_URL!, tokens);
  }

  public static getInstance() {
    if (this.instance == null) {
      this.instance = new AuthApiClient();
    }
    return this.instance;
  }

  // 사용자 정보 조회
  // TODO: Response 타입을 정의하고 사용하기
  // 현재는 임시로 빈 객체를 반환
  public getMe = async (): Promise<unknown> => {
    const response = await this.axios.request({
      method: "GET",
      url: `/auth/me`,
    });
    return response.data;
  };

  // 닉네임 중복 확인
  public getCheckNickName = async (nickname: string): Promise<string> => {
    const response = await this.axios.request({
      method: "GET",
      url: `/auth/me/check/nickname`,
      params: { nickname },
    });
    return response.data;
  };

  // 이메일 중복 확인
  public getCheckEmail = async (email: string): Promise<string> => {
    const response = await this.axios.request({
      method: "GET",
      url: `/auth/me/check/email`,
      params: { email },
    });
    return response.data;
  };

  // 회원가입
  public postAuthSignup = async (
    data: AuthRequest
  ): Promise<SignupResponse> => {
    const response = await this.axios.request({
      method: "POST",
      url: `/auth/signup`,
      data,
    });
    return response.data as SignupResponse;
  };

  // 로그인
  public postAuthLogin = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await this.axios.request({
      method: "POST",
      url: `/auth/login`,
      data,
    });

    const loginData = response.data as LoginResponse;

    // 토큰이 존재하는지 확인
    if (!loginData.data) {
      console.error("토큰이 없습니다:", loginData);
      throw new Error("로그인 응답에 토큰이 없습니다.");
    }

    // 토큰을 쿠키에 저장 (data 필드가 JWT 토큰)
    setTokens({
      accessToken: loginData.data,
    });

    return loginData;
  };
}

export default AuthApiClient;
