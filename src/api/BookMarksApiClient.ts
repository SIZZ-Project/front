import { BookmarksRequest, BookmarksResponse } from "@/type";
import BaseApiClient, { Tokens } from "./BaseApiClient";

class BookMarksApiClient extends BaseApiClient {
  private static instance: BookMarksApiClient;

  public constructor(tokens?: Tokens) {
    super(process.env.NEXT_PUBLIC_API_URL!, tokens);
  }

  public static getInstance() {
    if (this.instance == null) {
      this.instance = new BookMarksApiClient();
    }
    return this.instance;
  }

  // TODO: Response 타입을 정의하고 사용하기
  // 현재는 임시로 빈 객체를 반환
  public getBookMark = async (params: {
    articleId: string;
    userId: string;
  }): Promise<{}> => {
    const response = await this.axios.request({
      method: "GET",
      url: `/news/news/${params.articleId}/bookmark`,
      params: {
        userId: params.userId,
      },
    });
    return response.data;
  };

  public getUserBookmark = async (userId: string): Promise<{}> => {
    const response = await this.axios.request({
      method: "GET",
      url: `/news/news/${userId}/bookmark`,
    });
    return response.data;
  };

  public patchBookmark = async (
    data: BookmarksRequest
  ): Promise<BookmarksResponse> => {
    const response = await this.axios.request({
      method: "PATCH",
      url: `/news/news/${data.articleId}/bookmark`,
      data,
    });
    return response.data;
  };
}

export default BookMarksApiClient;
