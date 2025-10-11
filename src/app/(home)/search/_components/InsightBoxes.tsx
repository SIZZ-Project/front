"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import InsightDetailModal from "./InsightDetailModal";
import NewsApiClient from "@/api/NewsApiClient";

export default function InsightBoxes({ insights }: { insights: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [insight, setInsight] = useState("정치");
  const [news, setNews] = useState<string[]>([]);
  const handleOpen = (insight: string) => {
    setIsOpen(true);
    setInsight(insight);
  };

  const handleClose = () => {
    setIsOpen(false);
    setInsight("");
  };
  const getData = async (insight: string) => {
    const data = await NewsApiClient.getInstance().getInsights(insight);
    return data;
  };

  useEffect(() => {
    getData(insight).then((data) => {
      setNews(data.content);
    });
  }, [insight]);

  return (
    <>
      <div className="flex gap-6">
        {insights.map((insight) => (
          <div
            key={insight}
            className="w-[200px] h-[150px] rounded-[9px] bg-coolGray-90 px-6 py-5 relative cursor-pointer"
            onClick={() => handleOpen(insight)}
          >
            <p className="text-coolGray-10 text-2xl font-bold">{insight}</p>
            <Image
              src={"/icons/icon-arrow-right.svg"}
              alt="화살표 아이콘"
              width={9}
              height={9}
              className="absolute bottom-7 right-6"
            />
          </div>
        ))}
      </div>

      {insight && (
        <InsightDetailModal
          isOpen={isOpen}
          onClose={handleClose}
          insight={insight}
          news={news}
        />
      )}
    </>
  );
}
