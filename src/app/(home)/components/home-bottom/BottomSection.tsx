"use client";

import News from "@/app/(home)/components/home-bottom/News";
import { NewsResponseDto } from "@/type";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";

export default function BottomSection() {
  const [news, setNews] = useState<NewsResponseDto[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/news/all`
      );
      const data = await response.json();
      setNews(data);
    };
    fetchNews();
  }, []);

  console.log(news);

  return (
    <div className="pt-[50px] relative px-[136px] overflow-y-hidden">
      <News />
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
