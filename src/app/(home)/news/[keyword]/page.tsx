import React from "react";

import NewsList from "../_components/NewsList";

import TopSection from "../_components/TopSection";
import Image from "next/image";

export default async function News({
  params,
}: {
  params: { keyword: string };
}) {
  const { keyword } = params;

  return (
    <main className="relative mx-auto">
      <TopSection />
      <div className="pt-[50px] h-[1987px] relative overflow-y-hidden">
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
      <NewsList keyword={decodeURIComponent(keyword)} />
    </main>
  );
}
