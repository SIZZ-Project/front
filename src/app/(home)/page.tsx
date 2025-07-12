"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import '../../styles/globals.css'
import SIZZ_logo from '../../public/image/SiZZ_logo.svg'

export default function NavBar() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // hydration 오류 방지용
  }, []);

  if (!isMounted) return null;

  return (
      <main className="w-full h-979 flex items-center justify-center">
        <div className="flex flex-col items-start gap-1" style={{ width: "507px" }}>
            <Image src={SIZZ_logo} alt="ICON" width={128} height={128}/>
            <span className="font-bold" style={{color: "#F2F4F8", fontFamily: "Pretendard", fontSize: "85.122px", lineHeight: "normal"}}>SIZZ</span>
            <b>Society insight zooming zone</b>
            <a>당신의 뉴스 성향을 분석하고<br/>
                균형잡힌 <b>뉴스 정보 소비 플랫폼.</b></a>
            <b>편향 너머, 진짜 뉴스로.</b>
        </div>

        <div>

        </div>

        <div>
            <div>

            </div>
            <div>

            </div>
            <div>

            </div>
        </div>
      </main>
  );
}