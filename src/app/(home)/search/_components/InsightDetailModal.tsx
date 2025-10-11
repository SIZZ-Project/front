import Modal from "@/components/Modal";

export default function InsightDetailModal({
  isOpen,
  onClose,
  insight,
  news,
}: {
  isOpen: boolean;
  onClose: () => void;
  insight: string;
  news: string[];
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="pt-[72px] pb-6 flex flex-col gap-6">
        <div className="flex items-center justify-between p-3 rounded-xl bg-coolGray-80">
          <p className="flex items-center gap-3 text-2xl font-bold text-coolGray-10">
            {`${insight} 뉴스 키워드 정리`}
          </p>
          <p className="text-white text-2xl font-medium">2025.06.22</p>
        </div>

        <div className="flex gap-3">
          <div className="px-12 py-3 border border-primary-30 bg-white rounded-[30px]">
            <span className="text-primary-30 text-2xl">
              관계 네트워크 그래프
            </span>
          </div>
          <div className="px-12 py-3 rounded-[30px] bg-primary-30">
            <span className="text-2xl ">시간별 인터렉티브 맵</span>
          </div>
        </div>

        <div className="text-2xl font-bold text-coolGray-10  leading-[200%] h-[252px]">
          뉴스 리스트 요약 내용
          <ul>
            {news.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="w-full h-[1px] bg-[#a2a9b0]" />

        <div className="text-2xl font-bold text-coolGray-10  leading-[200%] h-[252px]">
          최근 주요 경제 이슈 키워드
        </div>

        <div className="w-full h-[1px] bg-[#a2a9b0]" />
      </div>
    </Modal>
  );
}
