import Logo from "@/app/(auth)/_components/Logo";
import Image from "next/image";
import Link from "next/link";

export default function PopUp({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`w-[600px] rounded-xl backdrop-blur-[20px] mx-auto px-[46px] py-10 flex flex-col gap-[100px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
      style={{
        background:
          "linear-gradient(104deg, rgba(255, 255, 255, 0.12) 0.37%, rgba(255, 255, 255, 0.20) 99.63%), rgba(0, 0, 0, 0.80)",
      }}
    >
      <div className="flex flex-col gap-[1px]">
        <div className="flex justify-end">
          <Link href="/" className="text-coolGray-30 text-2xl font-bold">
            <Image
              src="/icons/icon-close.svg"
              alt="닫기"
              width={24}
              height={24}
            />
          </Link>
        </div>

        <Logo />
      </div>
      <div className="text-[2.5rem] leading-[150%] mx-auto text-center">
        {children}
      </div>
      <div className="border-t border-coolGray-40 text-coolGray-30 mt-1 flex justify-between text-2xl font-bold leading-[150%]">
        <Link href="/">홈 바로가기</Link>
        <Link href="/">마이페이지</Link>
      </div>
    </div>
  );
}
