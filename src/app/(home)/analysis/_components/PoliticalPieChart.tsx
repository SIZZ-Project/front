"use client";

import { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type PoliticalPieChartProps = {
  progressivePercentage?: number;
  conservativePercentage?: number;
};

export default function PoliticalPieChart({
  progressivePercentage = 66.666,
  conservativePercentage = 33.3,
}: PoliticalPieChartProps) {
  const data = useMemo(
    () => ({
      labels: ["진보", "보수"],
      datasets: [
        {
          label: "정치 성향",
          data: [progressivePercentage, conservativePercentage],
          backgroundColor: ["#f2f4f8", "#21272a"],
          borderColor: ["#f2f4f8", "#21272a"],
          borderWidth: 1,
        },
      ],
    }),
    [progressivePercentage, conservativePercentage]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom" as const,
          labels: {
            usePointStyle: true,
            pointStyle: "circle" as const,
            padding: 24,
            boxWidth: 12,
            color: "#21272a",
            font: {
              size: 16,
              family:
                'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            },
          },
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const label = context.label || "";
              const value = context.parsed ?? 0;
              return `${label}: ${value.toFixed(1)}%`;
            },
          },
        },
      },
    }),
    []
  );

  return (
    <div className="flex w-full max-w-[320px] h-[370px] flex-col items-center gap-4 mx-auto">
      <Pie data={data} options={options} />
    </div>
  );
}


