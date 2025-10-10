import {
  NewsResponseDto,
  Pageable,
  PageNewsResponseDto,
  PageSearchNewsResponseDto,
} from "@/type";
import BaseApiClient, { Tokens } from "./BaseApiClient";

class NewsApiClient extends BaseApiClient {
  private static instance: NewsApiClient;

  public constructor(tokens?: Tokens) {
    super(process.env.NEXT_PUBLIC_API_URL!, tokens);
  }

  public static getInstance() {
    if (this.instance == null) {
      this.instance = new NewsApiClient();
    }
    return this.instance;
  }

  // TODO: Response 타입을 정의하고 사용하기
  // 현재는 임시로 빈 객체를 반환
  public getNewsView = async (articleId: string): Promise<unknown> => {
    const response = await this.axios.request({
      method: "GET",
      url: `/news/${articleId}/view`,
    });
    return response.data;
  };

  public getSearchNewsView = async (
    query: string,
    pageable: Pageable
  ): Promise<PageSearchNewsResponseDto> => {
    const response = await this.axios.request({
      method: "GET",
      url: `/search/news`,
      params: {
        query,
        ...pageable,
      },
    });
    return response.data;
  };

  public getNewsHot = async (): Promise<NewsResponseDto[]> => {
    const response = await this.axios.request({
      method: "GET",
      url: `/news/hot`,
    });
    return response.data;
  };

  public getNewsAll = async (): Promise<PageNewsResponseDto> => {
    const response = await this.axios.request({
      method: "GET",
      url: `/news/all`,
    });
    return response.data;
  };

  public getInsights = async (
    field: string
  ): Promise<{
    field: string;
    content: string[];
  }> => {
    const response = await this.axios.request({
      method: "GET",
      url: `/insights`,
      params: {
        field,
      },
    });
    return response.data;
  };
}

export default NewsApiClient;
