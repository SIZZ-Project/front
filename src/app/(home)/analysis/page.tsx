import Logo from "@/app/(auth)/_components/Logo";
import PoliticalPieChart from "./_components/PoliticalPieChart";
import WeeklyTrendChart from "./_components/WeeklyTrendChart";
import InterestBubbleChart from "./_components/InterestBubbleChart";

export default function AnalysisPage() {
  return (
    <div className="mt-25">
      <Logo />
      <div className="p-6 flex flex-col gap-6">
        <div className="text-2xl rounded-xl w-full flex justify-between items-center bg-coolGray-10 p-3 text-coolGray-90">
          <p>뉴스 소비 시간</p>
          <p>2025.11.09</p>
        </div>
        <p className="font-bold text-[40px] leading-[150%] align-bottom">
          나의 뉴스 서비스 성향은?
        </p>
        <div className="w-full h-[1px] bg-coolGray-20" />
        <p className="font-pretendard text-2xl leading-[150%]">
          타 유저에 비해서 오전시간대에 뉴스를 자주 확인하고 있어요.
          <br />
          09-10시간대에 경제 뉴스를 자주 확인하시네요. <br />
          알림으로 추가해드릴까요?
        </p>

        <button className="text-2xl w-[345px] h-[72px] rounded-xl flex justify-between items-center bg-coolGray-10 px-5 py-3 text-coolGray-90">
          +09시 주요 경제 뉴스 알림받기
        </button>

        <div className="flex gap-6">
          <div className="p-6 flex flex-col gap-6 w-[699px]">
            <div className="text-2xl rounded-xl w-full flex justify-between items-center bg-coolGray-10 p-3 text-coolGray-90">
              <p>진보</p>
              <p>2025.11.09</p>
            </div>
            <p className="font-bold text-[40px] leading-[150%] align-bottom">
              나의 뉴스 서비스 성향은?
            </p>
            <div className="w-full h-[1px] bg-coolGray-20" />
            <p className="font-pretendard text-2xl leading-[150%]">
              타 유저에 비해서 오전시간대에 뉴스를 자주 확인하고 있어요.
              <br />
              09-10시간대에 경제 뉴스를 자주 확인하시네요. <br />
              알림으로 추가해드릴까요?
            </p>

            <PoliticalPieChart />
            <button className="text-[20px] w-[460px] h-[72px] rounded-xl flex justify-between items-center bg-coolGray-10 px-6 py-3 text-coolGray-90">
              추천 뉴스에 보수 정당의 기사를 더 늘릴까요?
            </button>
          </div>
          <div className="p-6 flex flex-col gap-6 w-[699px]">
            <div className="text-2xl rounded-xl w-full flex justify-between items-center bg-coolGray-10 p-3 text-coolGray-90">
              <p>뉴스 소비 시간</p>
              <p>2025.11.09</p>
            </div>
            <p className="font-bold text-[40px] leading-[150%] align-bottom">
              나의 시청 시간은?
            </p>

            <WeeklyTrendChart />

            <div className="w-full h-[1px] bg-coolGray-20" />
            <p className="font-pretendard text-2xl leading-[150%]">
              이번주는 2시간 봤어요. 저번주에 비해 1시간 더 늘었네요. 좋은 뉴스
              소비 습관이예요!
            </p>
          </div>
        </div>
        <div className="p-6 flex flex-col gap-6">
          <div className="text-2xl rounded-xl w-full flex justify-between items-center bg-coolGray-10 p-3 text-coolGray-90">
            <p>진보</p>
            <p>2025.11.09</p>
          </div>
          <p className="font-bold text-[40px] leading-[150%] align-bottom">
            요즘 나의 관심사는?
          </p>
          <div className=" w-full h-[1px] bg-coolGray-20" />

          <div className="flex gap-6 items-center">
            <p className="font-pretendard text-2xl leading-[150%]">
              최근에 본 뉴스에서 관심사를 도출했어요!
              <br />
              제미나이, 고양이, AI 순으로 많이 확인했어요. 제미나이, 고양이, AI
              순으로 많이 확인했어요. 제미나이, 고양이, AI 순으로 많이
              확인했어요. 제미나이, 고양이, AI 순으로 많이 확인했어요.제미나이,
              고양이, AI 순으로 많이 확인했어요.제미나이, 고양이, AI 순으로 많이
              확인했어요.제미나이, 고양이, AI 순으로 많이 확인했어요.제미나이,
              고양이, AI 순으로 많이 확인했어요.제미나이, 고양이, AI 순으로 많이
              확인했어요.제미나이, 고양이, AI 순으로 많이 확인했어요.제미나이,
              고양이, AI 순으로 많이 확인했어요.
              <br />
              제미나이, 고양이, AI 순으로 많이 확인했어요.제미나이, 고양이, AI
              순으로 많이 확인했어요.제미나이, 고양이, AI 순으로 많이
              확인했어요.
            </p>
            <InterestBubbleChart />
          </div>
        </div>
      </div>
    </div>
  );
}
