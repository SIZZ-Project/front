"use client";

import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
  type TooltipItem,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function WeeklyTrendChart() {
  const labels = useMemo(
    () => ["11/03", "11/04", "11/05", "11/06", "11/07", "11/08", "11/09"],
    []
  );

  const data = useMemo<ChartData<"line">>(
    () => ({
      labels,
      datasets: [
        {
          label: "이번주",
          data: [2.5, 3.5, 4.2, 3.8, 5.5, 6.2, 8.1],
          borderColor: "#4d5358",
          backgroundColor: "#4d5358",
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.35,
        },
        {
          label: "저번주",
          data: [3.2, 2.9, 3.1, 2.5, 3.8, 4.0, 4.6],
          borderColor: "#c1c7cd",
          backgroundColor: "#c1c7cd",
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.35,
        },
      ],
    }),
    [labels]
  );

  const options = useMemo<ChartOptions<"line">>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: "날짜",
            color: "#878d96",
            font: {
              size: 14,
              weight: 500,
            },
          },
          grid: {
            display: false,
          },
          ticks: {
            color: "#697077",
            font: {
              size: 12,
            },
          },
        },
        y: {
          title: {
            display: true,
            text: "시간",
            color: "#878d96",
            font: {
              size: 14,
              weight: 500,
            },
          },
          grid: {
            color: "rgba(135, 141, 150, 0.2)",
          },
          ticks: {
            color: "#697077",
            font: {
              size: 12,
            },
            beginAtZero: true,
            callback: (value) => `${value}h`,
          },
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            pointStyle: "line",
            padding: 20,
            color: "#21272a",
            font: {
              size: 14,
              family:
                'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            },
          },
        },
        tooltip: {
          callbacks: {
            label: (context: TooltipItem<"line">) => {
              const label = context.dataset.label ?? "";
              const value = context.parsed.y ?? 0;
              return `${label}: ${value.toFixed(1)}시간`;
            },
          },
        },
      },
      elements: {
        line: {
          borderWidth: 3,
        },
        point: {
          borderWidth: 2,
        },
      },
    }),
    []
  );

  return (
    <div className="flex w-full max-w-[320px] h-[370px] flex-col items-center gap-4 mx-auto">
      <Line data={data} options={options} />
    </div>
  );
}
