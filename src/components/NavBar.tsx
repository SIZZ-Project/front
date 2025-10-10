"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { User } from "lucide-react";
import SIZZ_logo from "@/../public/image/SiZZ_logo.svg";
import HomeSearchBar from "@/components/Home-SearchBar";
import "@/styles/globals.css";

export default function NavBar() {
  const { setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTheme("dark");
  }, [setTheme]);

  if (!isMounted) return null;

  const isDark = "dark";
  const textColor = isDark ? "text-white" : "text-gray-800";
  const navBg = isDark
    ? "bg-[rgba(49,49,49,0.8)]"
    : "bg-white border-b border-gray-300";

  return (
    <nav
      className={`w-full h-16 flex items-center justify-between px-6 ${navBg} transition-colors duration-300`}
    >
      <div className="flex items-center gap-6">
        <Link href="/" className={`flex items-center gap-2 ${textColor}`}>
          <Image src={SIZZ_logo} alt="SIZZ Logo" width={32} height={32} />
          <span className="text-xl font-semibold">SIZZ</span>
        </Link>
        <div className="pl-2">
          <HomeSearchBar />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Link href="/" className={`${textColor} hover:text-blue-400`}>
          홈
        </Link>
        <Link href="/pearNews" className={`${textColor} hover:text-blue-400`}>
          공정 뉴스
        </Link>
        <Link href="/analysis" className={`${textColor} hover:text-blue-400`}>
          내 성향분석
        </Link>
        <Link href="/community" className={`${textColor} hover:text-blue-400`}>
          커뮤니티
        </Link>
        <Link href="/myProfile" className={`${textColor} hover:text-blue-400`}>
          <User />
        </Link>

        {/* <span
          className={`${isDark ? "text-gray-300" : "text-gray-500"} text-sm`}
        >
          {theme}
        </span>
        <Switch
          aria-label="다크 모드 토글"
          checked={isDark}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          className="bg-coolGray-80 data-[state=checked]:bg-primary-30"
          color="white"
        /> */}
      </div>
    </nav>
  );
}
