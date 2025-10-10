"use client";

import clsx from "clsx";
import { useState } from "react";

const TABS = [
  {
    id: "home",
    name: "커뮤니티 홈",
  },
  {
    id: "hot",
    name: "실시간 HOT",
  },
];
export default function Tabs() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  return (
    <div className="flex gap-6 w-[723px]">
      {TABS.map((tab) => (
        <div
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={clsx(
            "p-3 cursor-pointer text-[40px] leading-[150%]",
            activeTab === tab.id && "font-bold border-b border-coolGray-10"
          )}
        >
          {tab.name}
        </div>
      ))}
    </div>
  );
}
