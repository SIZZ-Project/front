import Image from "next/image";
import InsightBoxes from "./_components/InsightBoxes";
import Logo from "@/app/(auth)/_components/Logo";

const INSIGHTS = ["정치", "경제", "사회", "문화", "과학", "세계"];

export default function SearchPage() {
  return (
    <div className="flex flex-col gap-16">
      <Logo />
      <div className="flex flex-col gap-[100px]">
        <div className="flex justify-center items-center flex-col gap-12">
          <p className="text-[40px] font-bold text-coolGray-10">
            무슨 뉴스를 찾아드릴까요?
          </p>

          <div className="relative w-full">
            <input
              type="text"
              className="rounded-xl w-full h-[6.25rem] text-4xl pl-6 backdrop-blur-xl bg-coolGray-90"
            />
            <div className="absolute top-1/2 right-6 -translate-y-1/2 cursor-pointer flex items-center gap-6">
              <p className="text-2xl">
                키워드를 입력해주세요. 예시{")"} 금리 인상
              </p>
              <Image
                src="/icons/icon-click.svg"
                width={43}
                height={43}
                alt="클릭 아이콘"
                className=""
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <p className="text-2xl">
            Sizz에서 제공하는 분야별 인사이트를 확인해보세요.
          </p>
          <InsightBoxes insights={INSIGHTS} />
        </div>
      </div>
    </div>
  );
}
