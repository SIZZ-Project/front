import NewsApiClient from "@/api/NewsApiClient";
import NewsCard from "../../components/home-bottom/NewsCard";

const hotNews = [
  { category: "정치" },
  { category: "중립" },
  { category: "진보" },
];

export default async function NewsList({ keyword }: { keyword: string }) {
  const news = await NewsApiClient.getInstance().getSearchNewsView(keyword, {
    page: 0,
    size: 10,
  });

  return (
    <div className="absolute w-full top-[490px] flex flex-col gap-[200px] mx-auto bg-[rgba(18,22,25,0.25)] p-16">
      <div>
        <div className="text-[40px] font-bold leading-[150%] text-coolGray-10">
          검색어 “{keyword}”에 관한 결과
        </div>
        <div className="bg-[#343A3F] h-[0.1875rem] w-full" />
        <div className={`flex flex-col gap-6 mt-[4rem]`}>
          {news.content.length === 0 ? (
            <div
              style={{
                background:
                  "linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), linear-gradient(103.52deg, rgba(255, 255, 255, 0.12) 0.37%, rgba(255, 255, 255, 0.2) 99.63%)",
              }}
              className="w-full py-8 !bg-[#282829] text-coolGray-30 text-center text-2xl leading-[150%] rounded-xl"
            >
              검색어 "{keyword}"에 관한 결과를 찾지 못했습니다.
            </div>
          ) : (
            <>
              {news.content.map((item, idx) => (
                <NewsCard
                  key={idx}
                  category={"정치"}
                  className={`h-[470px] w-full max-h-[470px]`}
                  title={item.title}
                  content={item.description}
                  date={item.pubDate.split("T")[0]}
                  newsData={{
                    articleId: item.articleId,
                    title: item.title,
                    description: item.description,
                    link: item.link,
                    category: ["정치"],
                    pubDate: item.pubDate,
                    sourceName: item.sourceName,
                    viewCount: 0,
                  }}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
