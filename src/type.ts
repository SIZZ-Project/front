export interface CommentRequest {
  articleId: number;
  userId: string;
  content: string;
}

export interface CommentResponse {
  id: number;
  articleId: number;
  userId: string;
  content: string;
  createdAt: string; // ISO 8601 date string
}

export interface AuthRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: string; // JWT 토큰
}

export interface SignupResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data?: T;
}

export interface BookmarksRequest {
  articleId: number;
  bookmarked?: boolean;
}

export interface BookmarksResponse {
  id: number;
  userId: number;
  articleId: number;
  bookmarked?: boolean;
}

export interface LikeRequest {
  articleId: string;
  userId?: string;
  liked?: boolean;
}

export interface LikeResponse {
  id: number;
  articleId: string;
  userId: string;
  liked: boolean;
}

export interface Pageable {
  page: number; // 최소 0
  size: number; // 최소 1
  sort?: string[];
}

export interface PageSearchNewsResponseDto {
  totalElements: number;
  totalPages: number;
  pageable: PageableObject;
  size: number;
  content: SearchNewsResponseDto[];
  number: number;
  sort: SortObject;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface PageableObject {
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  offset: number;
  sort: SortObject;
  unpaged: boolean;
}

export interface SearchNewsResponseDto {
  articleId: string;
  title: string;
  description: string;
  link: string;
  pubDate: string; // ISO 8601 date string
  sourceName: string;
  category: ["정치" | "중립" | "진보"];
}

export interface SortObject {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

export interface NewsResponseDto {
  articleId: string;
  title: string;
  description: string;
  link: string;
  category: string[];
  pubDate: string; // ISO 8601 date string
  sourceName: string;
  viewCount: number;
}

export interface PageNewsResponseDto {
  totalElements: number;
  totalPages: number;
  pageable: PageableObject;
  size: number;
  content: NewsResponseDto[];
  number: number;
  sort: SortObject;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
