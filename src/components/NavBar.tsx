'use client';

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@/shared/ui/switch/switch";
import { User } from "lucide-react";
import HomeSearchBar from "@/widgets/navbar/ui/Home-SearchBar";
import '../../../styles/globals.css';
import SIZZ_logo from '../../../../public/image/SiZZ_logo.svg'

export default function NavBar() {
    const { theme, setTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <nav className={`w-full h-16 flex items-center justify-between px-6 transition-colors duration-300 ${theme === "dark" ? "bg-gray-800" : "bg-white border-b border-gray-300"}`}>
            <div className="flex items-center gap-6 p-7">
                <div className="flex items-center gap-2">
                <Link href="/" className={`flex items-center gap-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    <Image src={SIZZ_logo} alt="SIZZ Logo" width={32} height={32} />
                    <span className="text-xl font-semibold">SIZZ</span>
                </Link>
                </div>
                <div>
                <HomeSearchBar />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <Link href="/" className={`${theme === "dark" ? "text-white" : "text-gray-800"} hover:text-blue-400`}>홈</Link>
                <Link href="/pearNews" className={`${theme === "dark" ? "text-white" : "text-gray-800"} hover:text-blue-400`}>공정 뉴스</Link>
                <Link href="/analysis" className={`${theme === "dark" ? "text-white" : "text-gray-800"} hover:text-blue-400`}>내 성향분석</Link>
                <Link href="/myProfile" className={`${theme === "dark" ? "text-white" : "text-gray-800"} hover:text-blue-400`}><User /></Link>

                <span className={`${theme === "dark" ? "text-gray-300" : "text-gray-500"} text-sm`}>{theme}</span>
                <Switch
                    aria-label="다크 모드 토글"
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                    className="data-[state=checked]:bg-indigo-600"
                />
            </div>
        </nav>
    );
}