import Image from "next/image";

export default function NewsCardWithImage() {
  return (
    <div
      className="p-6 w-[748px] rounded-xl flex flex-col gap-6"
      style={{
        background:
          "linear-gradient(104deg, rgba(255, 255, 255, 0.12) 0.37%, rgba(255, 255, 255, 0.20) 99.63%), rgba(0, 0, 0, 0.80)",
      }}
    >
      <div className="flex items-center justify-between p-3 rounded-xl bg-coolGray-100">
        <p className="text-white text-2xl font-medium">2025.06.22</p>
      </div>

      <div className="flex gap-6">
        <div className="w-[270px] h-[414px] bg-white shrink-0">이미지</div>
        <div className="flex flex-col gap-6 w-full">
          <p className="text-white text-2xl font-medium">게시글 제목</p>
          <div className="flex items-center gap-6">
            <Image
              src="/icons/icon-good.svg"
              alt="good"
              width={32}
              height={32}
            />

            <Image src="/icons/icon-bad.svg" alt="bad" width={32} height={32} />

            <Image
              src="/icons/icon-comment.svg"
              alt="heart"
              width={32}
              height={32}
            />
          </div>
          <div className="h-[1px] bg-coolGray-10" />
          <div className="text-[20px] tracking-wide">
            게시글 글입니다게시글 글입니다게시글 글입니다게시글 글입니다게시글
            글입니다게시글 글입니다게시글 글입니다게시글 글입니다게시글
            글입니다게시글 글입니다게시글 글입니다게시글 글입니다게시글
            글입니다게시글 글입니다
          </div>
        </div>
      </div>
    </div>
  );
}
