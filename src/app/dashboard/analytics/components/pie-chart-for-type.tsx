"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface PieChartProps {
  chartTitle?: string;
  chartDesc?: string;
  netWorth?: string;
  chartData: { type: "one_time" | "recurring"; amount: number; fill: string }[];
  bottomDesc1?: string;
  bottomDesc2?: string;
}

export function PieChartForTypeComponent({
  chartTitle = "Pie Chart - Donut with Text",
  chartDesc = "January - June 2024",
  netWorth = "",
  chartData = [
    {
      type: "one_time",
      amount: 500,
      fill: "var(--color-one_time)",
    },
    {
      type: "recurring",
      amount: 500,
      fill: "var(--color-recurring)",
    },
  ],
  bottomDesc1 = "Trending up by 5.2% this month",
  bottomDesc2 = "Showing total visitors for the last 6 months",
}: PieChartProps) {
  const chartConfig = {
    visitors: {
      label: "Net Worth",
    },
    one_time: {
      label: "One Time",
      color: "hsl(var(--chart-1))",
    },
    recurring: {
      label: "Recurring",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{chartTitle}</CardTitle>
        <CardDescription>{chartDesc}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {netWorth.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Worth
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {bottomDesc1}
        </div>
        <div className="leading-none text-muted-foreground">{bottomDesc2}</div>
      </CardFooter>
    </Card>
  );
}
