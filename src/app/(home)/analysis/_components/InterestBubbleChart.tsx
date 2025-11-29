"use client";

import { useMemo } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  BubbleController,
  type BubbleDataPoint,
  type ChartData,
  type ChartDataset,
  type ChartOptions,
  type Plugin,
  type TooltipItem,
} from "chart.js";
import { Bubble } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, BubbleController);

type TopicDataset = ChartDataset<"bubble"> & {
  textColor: string;
  fontSize: number;
  showLabel: boolean;
};

type Topic = {
  label: string;
  x: number;
  y: number;
  r: number;
  color: string;
  textColor?: string;
  fontSize?: number;
  showLabel?: boolean;
};

const topics: Topic[] = [
  {
    label: "제미나이",
    x: 5.5,
    y: 6.5,
    r: 48,
    color: "#21272a",
    textColor: "#f2f4f8",
    fontSize: 18,
  },
  {
    label: "AI",
    x: 8.2,
    y: 7.8,
    r: 28,
    color: "#c1c7cd",
    fontSize: 16,
  },
  {
    label: "건강",
    x: 8.4,
    y: 4.5,
    r: 22,
    color: "#dde1e6",
    fontSize: 14,
  },
  {
    label: "고양이",
    x: 2.5,
    y: 3.8,
    r: 32,
    color: "#4d5358",
    textColor: "#f2f4f8",
    fontSize: 16,
  },
  {
    label: "츄르",
    x: 3.8,
    y: 6.9,
    r: 18,
    color: "#f2f4f8",
    fontSize: 12,
  },
  {
    label: "",
    x: 1.2,
    y: 1.1,
    r: 8,
    color: "#dde1e6",
    showLabel: false,
  },
  {
    label: "",
    x: 9.2,
    y: 9.1,
    r: 10,
    color: "#dde1e6",
    showLabel: false,
  },
];

const bubbleLabelPlugin: Plugin<"bubble"> = {
  id: "bubbleLabel",
  afterDatasetsDraw: (chart) => {
    const { ctx } = chart;
    const datasets = chart.data.datasets as TopicDataset[];

    ctx.save();

    datasets.forEach((dataset, datasetIndex) => {
      if (!dataset.showLabel) {
        return;
      }

      const meta = chart.getDatasetMeta(datasetIndex);
      meta.data.forEach((element, index) => {
        const dataPoint = dataset.data[index] as BubbleDataPoint;

        const { x, y } = element.getProps(["x", "y"], true);
        const radius = dataPoint?.r ?? 0;
        const fontSize =
          dataset.fontSize ?? Math.max(10, Math.min(18, radius / 2));

        ctx.fillStyle = dataset.textColor ?? "#21272a";
        ctx.font = `600 ${fontSize}px Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(dataset.label ?? "", x, y);
      });
    });

    ctx.restore();
  },
};

export default function InterestBubbleChart() {
  const data = useMemo<ChartData<"bubble">>(
    () => ({
      datasets: topics.map(
        (topic): TopicDataset => ({
          label: topic.label,
          data: [
            {
              x: topic.x,
              y: topic.y,
              r: topic.r,
            },
          ],
          backgroundColor: topic.color,
          borderColor: "transparent",
          hoverBackgroundColor: topic.color,
          hoverBorderColor: "transparent",
          textColor: topic.textColor ?? "#21272a",
          fontSize: topic.fontSize ?? 14,
          showLabel: topic.showLabel ?? Boolean(topic.label),
        })
      ),
    }),
    []
  );

  const options = useMemo<ChartOptions<"bubble">>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: "linear",
          min: 0,
          max: 10,
          grid: {
            display: false,
          },
          ticks: {
            display: false,
          },
          border: {
            color: "#dde1e6",
            width: 6,
          },
          title: {
            display: true,
            text: "07.12 ~ 07.22",
            color: "#878d96",
            font: {
              size: 14,
              weight: 500,
            },
            padding: {
              top: 24,
            },
          },
        },
        y: {
          type: "linear",
          min: 0,
          max: 10,
          grid: {
            display: false,
          },
          ticks: {
            display: false,
          },
          border: {
            color: "#dde1e6",
            width: 6,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context: TooltipItem<"bubble">) => {
              const label = context.dataset.label ?? "";
              const value = context.raw as BubbleDataPoint;
              return `${label} · 관심도 ${Math.round(value.r)}`;
            },
          },
        },
      },
      elements: {
        point: {
          borderWidth: 0,
        },
      },
    }),
    []
  );

  return (
    <div className="flex h-[320px] w-full max-w-[1020px] flex-col items-center justify-center gap-4">
      <Bubble data={data} options={options} plugins={[bubbleLabelPlugin]} />
    </div>
  );
}
