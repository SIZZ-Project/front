import { LikeRequest, LikeResponse } from "@/type";
import BaseApiClient, { Tokens } from "./BaseApiClient";

class LikeApiClient extends BaseApiClient {
  private static instance: LikeApiClient;

  public constructor(tokens?: Tokens) {
    super(process.env.NEXT_PUBLIC_API_URL!, tokens);
  }

  public static getInstance() {
    if (this.instance == null) {
      this.instance = new LikeApiClient();
    }
    return this.instance;
  }

  // 좋아요 상태 조회
  public getLike = async (params: {
    articleId: string;
    userId: string;
  }): Promise<LikeResponse> => {
    const response = await this.axios.request({
      method: "GET",
      url: `/news/news/${params.articleId}/like`,
      params: {
        userId: params.userId,
      },
    });
    return response.data;
  };

  // 좋아요 토글
  public patchLike = async (data: LikeRequest): Promise<LikeResponse> => {
    const response = await this.axios.request({
      method: "PATCH",
      url: `/news/news/${data.articleId}/like`,
      data,
    });
    return response.data;
  };
}

export default LikeApiClient;


