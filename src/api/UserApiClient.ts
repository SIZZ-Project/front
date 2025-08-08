import { AuthRequest, CommentRequest, CommentResponse } from "@/type";
import BaseApiClient, { Tokens } from "./BaseApiClient";

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
  public getMe = async (): Promise<{}> => {
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
  public postAuthSignup = async (data: AuthRequest): Promise<{}> => {
    const response = await this.axios.request({
      method: "POST",
      url: `/auth/signup`,
      data,
    });
    return response.data;
  };

  // 로그인
  public postAuthLogin = async (
    data: Omit<AuthRequest, "nickname">
  ): Promise<{}> => {
    const response = await this.axios.request({
      method: "POST",
      url: `/auth/login`,
      data,
    });
    return response.data;
  };
}

export default AuthApiClient;
