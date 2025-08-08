import { CommentRequest, CommentResponse } from "@/type";
import BaseApiClient, { Tokens } from "./BaseApiClient";

class CommentApiClient extends BaseApiClient {
  private static instance: CommentApiClient;

  public constructor(tokens?: Tokens) {
    super(process.env.NEXT_PUBLIC_API_URL!, tokens);
  }

  public static getInstance() {
    if (this.instance == null) {
      this.instance = new CommentApiClient();
    }
    return this.instance;
  }

  // 댓글 조회
  public getNewsComments = async (
    articleId: string
  ): Promise<CommentResponse[]> => {
    const response = await this.axios.request({
      method: "GET",
      url: `/news/${articleId}/comments`,
    });
    return response.data;
  };

  // 댓글 작성
  public postNewsComments = async (
    params: Pick<CommentRequest, "articleId" | "userId" | "content">
  ): Promise<CommentResponse> => {
    const response = await this.axios.request({
      method: "POST",
      url: `/news/${params.articleId}/comments`,
      data: {
        userId: params.userId,
        content: params.content,
      },
    });
    return response.data;
  };

  // 댓글 수정
  public patchNewsComments = async (
    params: Pick<CommentRequest, "articleId" | "userId" | "content"> & {
      commentId: number;
    }
  ): Promise<CommentResponse> => {
    const response = await this.axios.request({
      method: "PATCH",
      url: `/news/${params.articleId}/comments/${params.commentId}`,
      data: {
        articleId: params.articleId,
        userId: params.userId,
        content: params.content,
      },
    });
    return response.data;
  };

  // 댓글 삭제
  public deleteNewsComments = async (
    params: Pick<CommentRequest, "articleId" | "userId" | "content"> & {
      commentId: number;
    }
  ) => {
    const response = await this.axios.request({
      method: "DELETE",
      url: `/news/${params.articleId}/comments/${params.commentId}`,
    });
    return response.data;
  };
}

export default CommentApiClient;
