import Image from "next/image";

const ACTIONS_ACIONS = [
  {
    name: "좋아요",
    icon: "/icons/icon-heart.svg",
  },
  {
    name: "댓글",
    icon: "/icons/icon-comment.svg",
  },
  {
    name: "북마크",
    icon: "/icons/icon-bookmark.svg",
  },
  {
    name: "공유하기",
    icon: "/icons/icon-share.svg",
  },
];

export default function NewsCard({
  category = "정치",
  date = "2025.06.22",
  title = "기사 타이틀기사 타이틀기사 타이틀기사 타이틀기사 타이틀기사 타이틀",
  content = "기사 내용입니다. 기사 내용입니다. 기사 내용입니다. 기사 내용입니다. 기사 내용입니다. 기사 내용입니다. 기사 내용입니다. 기사 내용입니다. 기사 내용입니다. 기사 내용입니다. 기사 내용입니다. 기사 내용입니다.",
  className = "",
}: {
  category?: "정치" | "진보" | "중립";
  date?: string;
  title?: string;
  content?: string;
  className?: string;
}) {
  const status = {
    정치: "text-error",
    중립: "text-warning",
    진보: "text-success",
  };
  return (
    <div
      className={`aspect-[748/470] w-full rounded-xl opacity-80 backdrop-blur-[20px] mx-auto p-6 flex flex-col gap-6 ${className}`}
      style={{
        background:
          "linear-gradient(104deg, rgba(255, 255, 255, 0.12) 0.37%, rgba(255, 255, 255, 0.20) 99.63%), rgba(0, 0, 0, 0.80)",
      }}
    >
      <div className="w-full py-3 bg-[#121619] flex justify-between items-center rounded-xl px-3 text-2xl font-bold">
        <div className={`${status[category]}`}>{category}</div>
        <div className="text-coolGray-30">{date}</div>
      </div>
      <div className="text-2xl font-bold text-coolGray-30">{title}</div>
      <div className="flex gap-6 items-center">
        {ACTIONS_ACIONS.map((action) => (
          <Image
            key={action.name}
            src={action.icon}
            alt={action.name}
            width={32}
            height={32}
          />
        ))}
      </div>
      <div className="w-full h-[1px] bg-[#a2a9b0]"></div>
      <div className="w-full h-[120px] text-[18px] font-regular leading-[200%] space-y-[12px] text-coolGray-30">
        {content}
      </div>

      <div className="flex items-center justify-end gap-1 text-2xl leading-[200%] text-primary-10">
        <div>경제일보</div>
        <Image
          src={"/icons/icon-arrow-share.svg"}
          alt="공유하기 아이콘"
          width={24}
          height={24}
        />
      </div>
    </div>
  );
}
