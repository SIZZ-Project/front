import Image from "next/image";
import S_image from "@/../public/image/S_image.svg";
import L_image from "@/../public/image/L_image.svg";

export default function ImagePanel() {
    return (
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
            <div className="relative w-full h-full">
                {/* S 이미지 */}
                <Image
                    src={S_image}
                    alt="S 사진"
                    width={1301}
                    height={1012}
                    className="
                        absolute object-contain
                        translate-x-[5vw] translate-y-[8vh]
                        sm:translate-x-[8vw] sm:translate-y-[10vh]
                        md:translate-x-[12vw] md:translate-y-[12vh]
                        lg:translate-x-[16vw] lg:translate-y-[14vh]
                    "
                    priority
                />
                {/* L 이미지 */}
                <Image
                    src={L_image}
                    alt="L 사진"
                    width={1301}
                    height={1012}
                    className="
                        absolute object-contain
                        translate-x-[20vw] translate-y-[10vh]
                        sm:translate-x-[30vw] sm:translate-y-[12vh]
                        md:translate-x-[34vw] md:translate-y-[14vh]
                        lg:translate-x-[40vw] lg:translate-y-[16vh]
                    "
                    priority
                />
            </div>
        </div>
    );
}