"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import NewsDetailModal from "@/components/NewsDetailModal";
import { NewsResponseDto } from "@/type";
import BookMarksApiClient from "@/api/BookMarksApiClient";
import LikeApiClient from "@/api/LikeApiClient";
import { getUserId, isTokenValid } from "@/libs/auth";
import toast from "react-hot-toast";

const ACTIONS_ACIONS = [
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

export default function NewsCard({
  category = "정치",
  date = "2025.06.22",
  title = "기사 타이틀기사 타이틀기사 타이틀기사 타이틀기사 타이틀기사 타이틀",
  content = "기사 내용입니다. 기사 내용입니다. 기사 내용입니다. 기사 내용입니다. 기사 내용입니다. 기사 내용입니다. 기사 내용입니다. 기사 내용입니다. 기사 내용입니다. 기사 내용입니다. 기사 내용입니다. 기사 내용입니다.",
  className = "",
  newsData,
}: {
  category?: "정치" | "진보" | "중립";
  date?: string;
  title?: string;
  content?: string;
  className?: string;
  newsData?: NewsResponseDto;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const status = {
    정치: "text-error",
    중립: "text-warning",
    진보: "text-success",
  };

  // 인증된 사용자 ID 가져오기
  const userId = getUserId();
  const isAuthenticated = isTokenValid();

  // newsData가 변경될 때마다 hasFetched 리셋
  useEffect(() => {
    if (newsData?.articleId) {
      setHasFetched(false);
    }
  }, [newsData?.articleId]);

  // 북마크/좋아요 상태 조회 (한 번만 실행)
  useEffect(() => {
    if (!newsData?.articleId || hasFetched) return;

    // 인증되지 않은 사용자는 API 호출하지 않음
    if (!isAuthenticated || !userId) {
      setHasFetched(true);
      return;
    }

    const fetchStatus = async () => {
      try {
        const bookmarkApi = BookMarksApiClient.getInstance();
        const likeApi = LikeApiClient.getInstance();

        // 병렬로 API 호출
        const [bookmarkResponse, likeResponse] = await Promise.all([
          bookmarkApi.getBookMark({
            articleId: newsData.articleId,
            userId: userId,
          }),
          likeApi.getLike({
            articleId: newsData.articleId,
            userId: userId,
          }),
        ]);

        setIsBookmarked(bookmarkResponse.bookmarked || false);
        setIsLiked(likeResponse.liked);
        setHasFetched(true);
      } catch (error) {
        // 상태 조회 실패
        setHasFetched(true); // 에러가 발생해도 다시 시도하지 않음
      }
    };

    // 디바운싱으로 불필요한 호출 방지 (300ms)
    const timeoutId = setTimeout(fetchStatus, 300);
    return () => clearTimeout(timeoutId);
  }, [newsData?.articleId, hasFetched, isAuthenticated, userId]);

  const handleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!newsData?.articleId || isLoading) return;

    if (!isAuthenticated || !userId) {
      toast.error("북마크하려면 로그인이 필요합니다.");
      return;
    }

    try {
      setIsLoading(true);
      const bookmarkApi = BookMarksApiClient.getInstance();
      const response = await bookmarkApi.patchBookmark({
        articleId: parseInt(newsData.articleId),
        bookmarked: !isBookmarked,
      });

      setIsBookmarked(response.bookmarked || false);
      toast.success(
        isBookmarked ? "북마크가 해제되었습니다." : "북마크에 추가되었습니다."
      );
    } catch (error) {
      // 북마크 실패
      toast.error("북마크 처리에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!newsData?.articleId || isLoading) return;

    if (!isAuthenticated || !userId) {
      toast.error("좋아요하려면 로그인이 필요합니다.");
      return;
    }

    try {
      setIsLoading(true);
      const likeApi = LikeApiClient.getInstance();
      const response = await likeApi.patchLike({
        articleId: newsData.articleId,
        userId: userId,
        liked: !isLiked,
      });

      setIsLiked(response.liked);
      toast.success(
        isLiked ? "좋아요가 취소되었습니다." : "좋아요를 눌렀습니다."
      );
    } catch (error) {
      // 좋아요 실패
      toast.error("좋아요 처리에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div
        className={`rounded-xl opacity-80 backdrop-blur-[20px] mx-auto p-6 flex flex-col gap-6 cursor-pointer hover:opacity-90 transition-opacity ${className}`}
        style={{
          background:
            "linear-gradient(104deg, rgba(255, 255, 255, 0.12) 0.37%, rgba(255, 255, 255, 0.20) 99.63%), rgba(0, 0, 0, 0.80)",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="w-full py-3 bg-[#121619] flex justify-between items-center rounded-xl px-3 text-2xl font-bold">
          <div className={`${status[category]}`}>{category}</div>
          <div className="text-coolGray-30">{date}</div>
        </div>
        <div className="text-2xl font-bold text-coolGray-30 line-clamp-1 ">
          {title}
        </div>
        <div className="flex gap-6 items-center">
          {ACTIONS_ACIONS.map((action) => {
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
                className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                  action.name === "좋아요" || action.name === "북마크"
                    ? "cursor-pointer"
                    : "cursor-default"
                } ${isActive ? "opacity-100" : "opacity-70"}`}
              >
                <Image src={iconSrc} alt={action.name} width={32} height={32} />
              </button>
            );
          })}
        </div>
        <div className="w-full h-[1px] bg-[#a2a9b0]" />
        <div className="w-full h-[120px] font-regular leading-[200%] space-y-[12px] text-coolGray-30 line-clamp-5">
          {content}
        </div>

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

      {/* News Detail Modal */}
      <NewsDetailModal
        news={newsData || null}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
