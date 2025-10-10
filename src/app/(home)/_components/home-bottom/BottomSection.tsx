import NewsApiClient from "@/api/NewsApiClient";
import News from "@/app/(home)/_components/home-bottom/News";

import Image from "next/image";

export default async function BottomSection() {
  const news = await NewsApiClient.getInstance().getNewsAll();

  return (
    <div className="pt-[50px] relative px-[136px] overflow-y-hidden">
      <News news={news} />
      <div className="absolute top-[536px] left-[-670px] w-full max-w-[1486px] aspect-[1486/1321] mx-auto z-[-1]">
        <Image
          src="/image/Z_image.png"
          alt="Z 이미지"
          className="object-contain"
          fill
          priority
        />
      </div>
    </div>
  );
}
