import React from "react";
import NewsCard from "./NewsCard";
import { twMerge } from "tailwind-merge";
import { PageSearchNewsResponseDto } from "@/type";

interface NewsProps {
  news: PageSearchNewsResponseDto;
}

export default function News({ news }: NewsProps) {
  const isScroll = news.content.length >= 3;

  return (
    <div className="flex flex-col gap-[200px] mx-auto bg-[rgba(18,22,25,0.25)] p-16">
      <div>
        <div className="text-[40px] font-bold leading-[150%] text-coolGray-10">
          실시간 HOT
        </div>
        <div className="bg-[#343A3F] h-[3px] w-full" />
        <div
          className={`flex gap-6 mt-1 ${
            isScroll ? "overflow-x-auto flex-nowrap" : "flex-wrap"
          }`}
        >
          {news.content.map((item) => (
            <NewsCard
              key={item.articleId}
              category={"정치"}
              className={twMerge(
                "aspect-[748/470] w-full max-h-[470px]",
                isScroll ? "md:w-[49%] flex-shrink-0" : "w-[50%]"
              )}
              title={item.title}
              content={item.description}
              date={item.pubDate}
            />
          ))}
        </div>
      </div>
      <div>
        <div className="text-[40px] font-bold leading-[150%] text-coolGray-10">
          관심 뉴스 추천
        </div>

        <div className="bg-[#343A3F] h-[3px] w-full" />

        <div className="flex gap-6 justify-between mt-1">
          <NewsCard category="정치" />
          <NewsCard category="진보" />
        </div>
      </div>
    </div>
  );
}
