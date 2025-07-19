import Image from "next/image";
import SIZZ_logo from "../../../../../public/image/SiZZ_logo.svg";

export default function LogoTitle() {
    return (
        <div
            className="flex flex-col gap-2 max-w-md
                       ml-4 sm:ml-8 md:ml-16
                       -translate-x-10 sm:-translate-x-20 md:-translate-x-[420px]
                       translate-y-10 sm:translate-y-14 md:translate-y-[60px]"
        >
            <div className="flex flex-row items-center gap-3 sm:gap-4 md:gap-5">
                <Image src={SIZZ_logo} alt="ICON" width={59} height={59} />
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white">SIZZ</span>
            </div>
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 text-white">
                <b className="text-sm sm:text-base md:text-lg">Society insight zooming zone</b>
                <div>
                    <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-snug">
                        당신의 뉴스 성향을 분석하고 <br />
                        균형잡힌 <b>뉴스 정보 소비 플랫폼.</b>
                    </p>
                    <b className="text-xs sm:text-sm md:text-base">편향 너머, 진짜 뉴스로.</b>
                </div>
            </div>
        </div>
    );
}