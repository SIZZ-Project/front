"use client";

import Image from "next/image";
import { useState } from "react";
import InsightDetailModal from "./InsightDetailModal";

export default function InsightBoxes({ insights }: { insights: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [insight, setInsight] = useState("");

  const handleOpen = (insight: string) => {
    setIsOpen(true);
    setInsight(insight);
  };

  const handleClose = () => {
    setIsOpen(false);
    setInsight("");
  };

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
        />
      )}
    </>
  );
}
