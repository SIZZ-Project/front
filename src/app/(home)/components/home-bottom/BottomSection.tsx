import News from "@/components/main/News";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function BottomSection() {
  return (
    <div className="pt-[128px] relative px-[136px] overflow-y-hidden">
      <News />
      <div className="absolute top-[536px] left-[-670px] w-full max-w-[1486px] aspect-[1486/1321] mx-auto z-[-1]">
        <Image
          src="/image/Z_image.png"
          alt="Z 이미지"
          className="object-contain"
          fill
          priority
        />
      </div>
    </div>
  );
}
