"use client";

import { useState } from "react";
import Image from "next/image";
import { NewsResponseDto } from "@/type";

interface Comment {
  id: number;
  userName: string;
  content: string;
  createdAt: string;
}

interface NewsDetailModalProps {
  news: NewsResponseDto | null;
  isOpen: boolean;
  onClose: () => void;
}

const ACTIONS_ACTIONS = [
  {
    name: "좋아요",
    icon: "/icons/icon-heart.svg",
  },
  {
    name: "댓글",
    icon: "/icons/icon-comment.svg",
  },
  {
    name: "북마크",
    icon: "/icons/icon-bookmark.svg",
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
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      userName: "유저 이름",
      content: "댓글 내용입니다.댓글 내용입니다. 댓글 내용입니다.",
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      userName: "유저 이름2",
      content: "댓글 내용입니다.댓글 내용입니다. 댓글 내용입니다.",
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      userName: "유저 이름3",
      content: "댓글 내용입니다.댓글 내용입니다. 댓글 내용입니다.",
      createdAt: new Date().toISOString(),
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        userName: "현재 유저",
        content: newComment.trim(),
        createdAt: new Date().toISOString(),
      };
      setComments([comment, ...comments]);
      setNewComment("");
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
            {ACTIONS_ACTIONS.map((action) => (
              <button
                key={action.name}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Image
                  src={action.icon}
                  alt={action.name}
                  width={24}
                  height={24}
                />
              </button>
            ))}
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
              placeholder="의견을 남겨주세요."
              className="w-full bg-transparent text-coolGray-30 placeholder-coolGray-30 focus:outline-none text-lg"
            />
            <button
              onClick={handleAddComment}
              disabled={!newComment.trim()}
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
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="w-full p-6 flex items-center bg-[#121619] rounded-2xl px-[27px] justify-between"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/icons/icon-profile.png"
                    alt="프로필"
                    width={30}
                    height={30}
                  />
                  <div className="flex flex-col gap-1">
                    <div className="text-white text-sm font-bold">
                      {comment.userName}
                    </div>
                    <div className="text-coolGray-30 text-sm">
                      {comment.content}
                    </div>
                  </div>
                </div>
                <Image
                  src="/icons/icon-heart.svg"
                  alt="좋아요"
                  width={24}
                  height={24}
                  className="cursor-pointer hover:opacity-70 transition-opacity"
                />
              </div>
            ))}
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
