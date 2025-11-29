import NewsCard from "@/app/(home)/_components/home-bottom/NewsCard";

export default function ScrapArticlePage() {
  return (
    <>
      <h1 className="text-4xl font-bold border-b-[3px]  border-coolGray-30 pb-4 mb-16">
        스크랩한 콘텐츠 모음
      </h1>
      <div className="flex gap-6 w-full overflow-x-hidden ">
        {Array.from({ length: 2 }).map((_, index) => (
          <NewsCard className="w-[432px] " key={index} />
        ))}
      </div>
    </>
  );
}
