export default function WhySIZZCard() {
  const cardStyle = {
    background:
      "linear-gradient(104deg, rgba(255, 255, 255, 0.12) 0.37%, rgba(255, 255, 255, 0.20) 99.63%), rgba(0, 0, 0, 0.80)",
  };

  return (
    <div
      className={`flex flex-col gap-4 w-[260px] sm:w-[280px] md:w-[300px] mt-[307px]`}
    >
      <div
        className="h-10 text-base sm:text-lg text-center rounded-xl flex items-center justify-center font-bold text-white"
        style={cardStyle}
      >
        WHY SIZZ?
      </div>

      <div
        className="p-3 sm:p-4 h-[110px] sm:h-[120px] rounded-xl text-white"
        style={cardStyle}
      >
        <p className="font-bold text-sm sm:text-base mb-1">개인화 추천</p>
        <p className="text-xs sm:text-sm text-gray-200">
          AI가 분석한 당신의 성향에 맞는 뉴스를 추천해드립니다.
        </p>
      </div>

      <div
        className="p-3 sm:p-4 h-[110px] sm:h-[120px] rounded-xl text-white"
        style={cardStyle}
      >
        <p className="font-bold text-sm sm:text-base mb-1">
          || 신뢰할 수 있는 정보
        </p>
        <p className="text-xs sm:text-sm text-gray-200">
          검증된 뉴스 소스에서 제공하는 신뢰 높은 정보입니다.
        </p>
      </div>

      <div
        className="p-3 sm:p-4 h-[110px] sm:h-[120px] rounded-xl text-white"
        style={cardStyle}
      >
        <p className="font-bold text-sm sm:text-base mb-1">||| 다양한 관점</p>
        <p className="text-xs sm:text-sm text-gray-200">
          반대 성향의 기사도 함께 제시하여 균형 잡힌 시각을 제공합니다.
        </p>
      </div>
    </div>
  );
}
