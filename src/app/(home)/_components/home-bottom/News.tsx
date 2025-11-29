import React from "react";
import NewsCard from "./NewsCard";
import { twMerge } from "tailwind-merge";
import { NewsResponseDto, PageNewsResponseDto } from "@/type";
import { isTokenValid } from "@/libs/auth";

interface NewsProps {
  news: PageNewsResponseDto;
  hotNews: NewsResponseDto[];
}

export default function News({ news, hotNews }: NewsProps) {
  const isScroll = news.content.length >= 3;
  const isScrollHot = hotNews.length >= 3;
  const isAuthenticated = isTokenValid();
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
              date={item.pubDate.split("T")[0]}
              newsData={{
                articleId: item.articleId,
                title: item.title,
                description: item.description,
                link: item.link,
                category: ["정치"], // 기본값으로 설정
                pubDate: item.pubDate,
                sourceName: item.sourceName,
                viewCount: 0, // 기본값으로 설정
              }}
            />
          ))}
          {news.content.length === 0 && (
            <div className="w-full h-[470px] flex items-center justify-center rounded-xl">
              <p className="text-coolGray-30 text-2xl leading-[150%]">
                뉴스가 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="text-[40px] font-bold leading-[150%] text-coolGray-10">
          선택 뉴스 추천
        </div>

        <div className="bg-[#343A3F] h-[3px] w-full" />

        <div className="flex gap-6 justify-between mt-1">
          {hotNews.length === 0 ? (
            <div
              style={{
                background:
                  "linear-gradient(104deg, rgba(255, 255, 255, 0.12) 0.37%, rgba(255, 255, 255, 0.20) 99.63%), rgba(0, 0, 0, 0.80)",
              }}
              className="w-full h-[470px]  flex items-center justify-center rounded-xl"
            >
              <p className="text-coolGray-30 text-2xl leading-[150%]">
                관심 뉴스 추천이 없습니다.
              </p>
            </div>
          ) : (
            hotNews.map((item) => (
              <NewsCard
                key={item.articleId}
                category={item.category[0] as "정치" | "진보" | "중립"}
                className={twMerge(
                  "aspect-[748/470] w-full max-h-[470px]",
                  isScrollHot ? "md:w-[49%] flex-shrink-0" : "w-[50%]"
                )}
                title={item.title}
                content={item.description}
                date={item.pubDate.split("T")[0]}
                newsData={item}
              />
            ))
          )}
        </div>
      </div>

      {isAuthenticated && (
        <div>
          <div className="text-[40px] font-bold leading-[150%] text-coolGray-10">
            관심 뉴스 추천
          </div>

          <div className="bg-[#343A3F] h-[3px] w-full" />

          <div className="flex gap-6 justify-between mt-1">
            {hotNews.length === 0 ? (
              <div
                style={{
                  background:
                    "linear-gradient(104deg, rgba(255, 255, 255, 0.12) 0.37%, rgba(255, 255, 255, 0.20) 99.63%), rgba(0, 0, 0, 0.80)",
                }}
                className="w-full h-[470px]  flex items-center justify-center rounded-xl"
              >
                <p className="text-coolGray-30 text-2xl leading-[150%]">
                  관심 뉴스 추천이 없습니다.
                </p>
              </div>
            ) : (
              hotNews.map((item) => (
                <NewsCard
                  key={item.articleId}
                  category={item.category[0] as "정치" | "진보" | "중립"}
                  className={twMerge(
                    "aspect-[748/470] w-full max-h-[470px]",
                    isScrollHot ? "md:w-[49%] flex-shrink-0" : "w-[50%]"
                  )}
                  title={item.title}
                  content={item.description}
                  date={item.pubDate.split("T")[0]}
                  newsData={item}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
