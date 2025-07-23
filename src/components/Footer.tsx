import Image from "next/image";
import SIZZ_logo from "@/../public/image/SiZZ_logo.svg";

export default function Footer() {
  return (
    <div className="w-full border-t border-coolGray-10 py-7 px-[100px] flex items-center gap-1">
      <Image src={SIZZ_logo} alt="SIZZ Logo" width={19} height={19} />
      <p className="text-2xl text-coolGray-10 flex gap-1">
        <span className="font-bold">SIZZ</span>
        <span>Society Insight, Zooming Zone</span>
      </p>
    </div>
  );
}
