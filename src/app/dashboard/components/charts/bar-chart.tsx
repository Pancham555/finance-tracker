"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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

interface ChartProps {
  chartTitle?: string;
  chartDateRange?: string;
  desc1?: string;
  desc2?: string;
  chartData?: { createdAt: Date; amount: number }[];
}

export function IncomeBarChartComponent({
  chartTitle = "Bar Chart - Label",
  chartDateRange = "January - June 2024",
  desc1 = "Trending up by 5.2% this month",
  desc2 = "Showing total visitors for the last 6 months",
  chartData,
}: ChartProps) {
  const chartConfig = {
    amount: {
      label: "Amount",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{chartTitle}</CardTitle>
        <CardDescription>{chartDateRange}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="createdAt"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                const date = new Date(value !== null ? value : Date.now());
                return date.toLocaleDateString("default", {
                  month: "short",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="amount" fill="var(--color-amount)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">{desc1}</div>
        <div className="leading-none text-muted-foreground">{desc2}</div>
      </CardFooter>
    </Card>
  );
}

/*
 [
    { createdAt: "January", amount: 186 },
    { createdAt: "February", amount: 305 },
    { createdAt: "March", amount: 237 },
    { createdAt: "April", amount: 73 },
    { createdAt: "May", amount: 209 },
    { createdAt: "June", amount: 214 },
  ],

*/
