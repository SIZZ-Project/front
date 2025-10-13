import Image from "next/image";

export default function Footer() {
  return (
    <div className="w-full border-t border-coolGray-10 py-7 px-[100px] flex items-center gap-1">
      <Image
        src={"/image/SiZZ_logo.svg"}
        alt="SIZZ Logo"
        width={19}
        height={19}
      />
      <p className="text-2xl text-coolGray-10 flex gap-1">
        <span className="font-bold">SIZZ</span>
        <span>Society Insight, Zooming Zone</span>
      </p>
    </div>
  );
}
