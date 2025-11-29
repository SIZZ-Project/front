import NewsCardWithImage from "../_components/NewsCardWithImage";

export default function AllWritingPage() {
  return (
    <>
      <h1 className="text-4xl font-bold border-b-[3px]  border-coolGray-30 pb-4 mb-16">
        내가 쓴 글 모음
      </h1>
      <div className="flex gap-6">
        {Array.from({ length: 2 }).map((_, index) => (
          <NewsCardWithImage key={index} />
        ))}
      </div>
    </>
  );
}
