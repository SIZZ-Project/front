import Image from "next/image";
import S_image from "@/../public/image/S_image.svg";
import L_image from "@/../public/image/L_image.svg";

export default function ImagePanel() {
  return (
    <div className="absolute w-full h-full -z-10 pointer-events-none">
      <div className="relative mx-auto h-full">
        {/* S 이미지 */}

        <div className="absolute min-w-[1301px] object-contain  top-0 left-1/2 -translate-x-1/2">
          <Image
            src={S_image}
            alt="S 사진"
            width={1301}
            height={1012}
            priority
          />
        </div>
        <div
          className="absolute min-w-[1301px] object-contain top-[180px] right-1/2"
          style={{ transform: "translateX(50%) translateX(240px)" }}
        >
          <Image
            src={L_image}
            alt="L 사진"
            width={1301}
            height={1012}
            priority
          />
        </div>
      </div>
    </div>
  );
}
