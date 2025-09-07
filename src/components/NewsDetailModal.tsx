"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { NewsResponseDto, CommentResponse } from "@/type";
import BookMarksApiClient from "@/api/BookMarksApiClient";
import LikeApiClient from "@/api/LikeApiClient";
import CommentApiClient from "@/api/CommentApiClient";
import { getUserId, isTokenValid } from "@/libs/auth";
import toast from "react-hot-toast";

// Comment 인터페이스는 CommentResponse와 동일하므로 제거하고 CommentResponse 사용

interface NewsDetailModalProps {
  news: NewsResponseDto | null;
  isOpen: boolean;
  onClose: () => void;
}

const ACTIONS_ACTIONS = [
  {
    name: "좋아요",
    icon: "/icons/icon-heart.svg",
    activeIcon: "/icons/icon-heart-active.svg",
  },
  {
    name: "댓글",
    icon: "/icons/icon-comment.svg",
  },
  {
    name: "북마크",
    icon: "/icons/icon-bookmark.svg",
    activeIcon: "/icons/icon-bookmark-active.svg",
  },
  {
    name: "공유하기",
    icon: "/icons/icon-share.svg",
  },
];

export default function NewsDetailModal({
  news,
  isOpen,
  onClose,
}: NewsDetailModalProps) {
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  // 인증된 사용자 ID 가져오기
  const userId = getUserId();
  const isAuthenticated = isTokenValid();

  // 모달이 열릴 때마다 hasFetched 리셋
  useEffect(() => {
    if (news?.articleId) {
      setHasFetched(false);
    }
  }, [news?.articleId]);

  // 북마크/좋아요 상태 조회 및 댓글 조회 (한 번만 실행)
  useEffect(() => {
    if (!news?.articleId || hasFetched) return;

    const fetchData = async () => {
      try {
        const commentApi = CommentApiClient.getInstance();

        // 댓글은 인증 없이도 조회 가능
        const commentsResponse = await commentApi.getNewsComments(
          news.articleId
        );
        console.log("댓글 응답:", commentsResponse);
        setComments(Array.isArray(commentsResponse) ? commentsResponse : []);

        // 인증된 사용자만 북마크/좋아요 상태 조회
        if (isAuthenticated && userId) {
          const bookmarkApi = BookMarksApiClient.getInstance();
          const likeApi = LikeApiClient.getInstance();

          const [bookmarkResponse, likeResponse] = await Promise.all([
            bookmarkApi.getBookMark({
              articleId: news.articleId,
              userId: userId,
            }),
            likeApi.getLike({
              articleId: news.articleId,
              userId: userId,
            }),
          ]);

          setIsBookmarked(bookmarkResponse.bookmarked || false);
          setIsLiked(likeResponse.liked);
        }

        setHasFetched(true);
      } catch (error) {
        console.error("데이터 조회 실패:", error);
        setHasFetched(true); // 에러가 발생해도 다시 시도하지 않음
      }
    };

    // 디바운싱으로 불필요한 호출 방지 (300ms)
    const timeoutId = setTimeout(fetchData, 300);
    return () => clearTimeout(timeoutId);
  }, [news?.articleId, hasFetched, isAuthenticated, userId]);

  const handleBookmark = async () => {
    if (!news?.articleId || isLoading) return;

    try {
      setIsLoading(true);
      const bookmarkApi = BookMarksApiClient.getInstance();
      const response = await bookmarkApi.patchBookmark({
        articleId: parseInt(news.articleId),
        bookmarked: !isBookmarked,
      });

      setIsBookmarked(response.bookmarked || false);
      toast.success(
        isBookmarked ? "북마크가 해제되었습니다." : "북마크에 추가되었습니다."
      );
    } catch (error) {
      console.error("북마크 실패:", error);
      toast.error("북마크 처리에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    if (!news?.articleId || isLoading) return;

    try {
      setIsLoading(true);
      const likeApi = LikeApiClient.getInstance();
      const response = await likeApi.patchLike({
        articleId: news.articleId,
        userId: userId!,
        liked: !isLiked,
      });

      setIsLiked(response.liked);
      toast.success(
        isLiked ? "좋아요가 취소되었습니다." : "좋아요를 눌렀습니다."
      );
    } catch (error) {
      console.error("좋아요 실패:", error);
      toast.error("좋아요 처리에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 댓글 작성
  const handleAddComment = async () => {
    if (!newComment.trim() || !news?.articleId || isLoading) return;

    if (!isAuthenticated || !userId) {
      toast.error("댓글을 작성하려면 로그인이 필요합니다.");
      return;
    }

    try {
      setIsLoading(true);
      const commentApi = CommentApiClient.getInstance();
      const response = await commentApi.postNewsComments({
        articleId: parseInt(news.articleId),
        userId: userId,
        content: newComment.trim(),
      });

      setComments([response, ...comments]);
      setNewComment("");
      toast.success("댓글이 작성되었습니다.");
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      toast.error("댓글 작성에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 댓글 삭제
  const handleDeleteComment = async (commentId: number) => {
    if (!news?.articleId || isLoading) return;

    if (!isAuthenticated || !userId) {
      toast.error("댓글을 삭제하려면 로그인이 필요합니다.");
      return;
    }

    try {
      setIsLoading(true);
      const commentApi = CommentApiClient.getInstance();
      await commentApi.deleteNewsComments({
        articleId: parseInt(news.articleId),
        userId: userId,
        content: "", // 삭제 시에는 content가 필요하지 않지만 타입상 필요
        commentId: commentId,
      });

      setComments(comments.filter((comment) => comment.id !== commentId));
      toast.success("댓글이 삭제되었습니다.");
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      toast.error("댓글 삭제에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  if (!isOpen || !news) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\./g, ".")
      .replace(/\s/g, "");
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "정치":
        return "text-error";
      case "중립":
        return "text-warning";
      case "진보":
        return "text-success";
      default:
        return "text-coolGray-30";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        style={{
          background:
            "linear-gradient(104deg, rgba(255, 255, 255, 0.12) 0.37%, rgba(255, 255, 255, 0.20) 99.63%), rgba(0, 0, 0, 0.80)",
        }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-scroll mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden px-6"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 z-10 p-2 rounded-full bg-opacity-20 hover:bg-opacity-30 transition-all"
        >
          <Image
            src="/icons/icon-close.svg"
            alt="닫기"
            width={24}
            height={24}
            className="filter brightness-0 invert"
          />
        </button>

        {/* Modal Header */}
        <div className="pt-[72px] pb-6 flex flex-col gap-6">
          <div className="flex items-center justify-between p-3 rounded-xl bg-coolGray-100">
            <div className="flex items-center gap-3">
              {news.category.map((cat, index) => (
                <span key={index}>{cat}</span>
              ))}
            </div>
            <div className="text-white text-lg font-medium">
              {formatDate(news.pubDate)}
            </div>
          </div>

          <h1 className="text-2xl font-bold text-coolGray-30  leading-[150%]">
            {news.title}
          </h1>

          {/* Action Buttons */}
          <div className="flex gap-6 items-center">
            {ACTIONS_ACTIONS.map((action) => {
              const isActive =
                (action.name === "좋아요" && isLiked) ||
                (action.name === "북마크" && isBookmarked);

              const iconSrc =
                isActive && action.activeIcon ? action.activeIcon : action.icon;

              return (
                <button
                  key={action.name}
                  onClick={
                    action.name === "좋아요"
                      ? handleLike
                      : action.name === "북마크"
                      ? handleBookmark
                      : undefined
                  }
                  disabled={isLoading}
                  className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                    action.name === "좋아요" || action.name === "북마크"
                      ? "cursor-pointer"
                      : "cursor-default"
                  } ${isActive ? "opacity-100" : "opacity-70"}`}
                >
                  <Image
                    src={iconSrc}
                    alt={action.name}
                    width={24}
                    height={24}
                  />
                </button>
              );
            })}
          </div>

          <div className="w-full h-[1px] bg-[#a2a9b0]" />
        </div>

        {/* Modal Body */}
        <div className="pb-6 h-[260px] overflow-y-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-coolGray-30 leading-relaxed text-lg">
              {news.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="w-full h-[1px] bg-[#a2a9b0]" />
          <div className="w-full h-[100px] bg-coolGray-80 rounded-2xl px-[27px] flex items-center">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                isAuthenticated
                  ? "의견을 남겨주세요."
                  : "로그인 후 댓글을 작성할 수 있습니다."
              }
              disabled={!isAuthenticated}
              className="w-full bg-transparent text-coolGray-30 placeholder-coolGray-30 focus:outline-none text-lg disabled:opacity-50"
            />
            <button
              onClick={handleAddComment}
              disabled={!newComment.trim() || !isAuthenticated}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Image
                src="/icons/icon-enter.png"
                alt="등록"
                width={43}
                height={43}
              />
            </button>
          </div>
          <div className="w-full h-[1px] bg-[#a2a9b0]" />
        </div>
        {/* Modal Footer */}
        <div className="flex flex-col gap-6 pb-6">
          <div className="flex flex-col gap-3 pt-6">
            {comments.length === 0 ? (
              <div className="text-center text-coolGray-30 py-8">
                아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
              </div>
            ) : (
              comments.map((comment, index) => (
                <div
                  key={index}
                  className="w-full p-6 flex items-center bg-[#121619] rounded-2xl px-[27px] justify-between"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <Image
                      src="/icons/icon-profile.png"
                      alt="프로필"
                      width={30}
                      height={30}
                    />
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-white text-sm font-bold">
                          {comment.userId}
                        </div>
                        <div className="text-coolGray-30 text-xs">
                          {new Date(comment.createdAt).toLocaleDateString(
                            "ko-KR",
                            {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </div>
                      </div>
                      <div className="text-coolGray-30 text-sm">
                        {comment.content}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/icons/icon-heart.svg"
                      alt="좋아요"
                      width={24}
                      height={24}
                      className="cursor-pointer hover:opacity-70 transition-opacity"
                    />
                    {comment.userId === userId && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        disabled={isLoading}
                        className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded transition-colors disabled:opacity-50"
                      >
                        삭제
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="w-full h-[1px] bg-[#a2a9b0]" />

          <div className="flex items-center justify-end gap-1 text-2xl leading-[200%] text-primary-10">
            <div>경제일보</div>
            <Image
              src={"/icons/icon-arrow-share.svg"}
              alt="공유하기 아이콘"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
