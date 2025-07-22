import { useEffect, useState } from "react";
import "@/styles/globals.css";
import TopSection from "@/app/(home)/components/home-top/TopSection";
import BottomSection from "./components/home-bottom/BottomSection";

export default function Page() {
  return (
    <main className="max-w-[1920px] mx-auto min-w-[1440px]">
      <TopSection />
      <BottomSection />
    </main>
  );
}
