"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

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

interface LineChartProps {
  chartTitle?: string;
  chartDesc?: string;
  lineTitle?: string;
  chartData?: { createdAt: string | Date; amount: number }[];
}

export function LineChartComponent({
  chartTitle = "Line Chart - Label",
  chartData = [
    { createdAt: "January", amount: 186 },
    { createdAt: "February", amount: 305 },
    { createdAt: "March", amount: 237 },
    { createdAt: "April", amount: 73 },
    { createdAt: "May", amount: 209 },
    { createdAt: "June", amount: 214 },
  ],
  chartDesc = "January - June 2024",
  lineTitle = "Desktop",
}: LineChartProps) {
  const chartConfig = {
    amount: {
      label: lineTitle,
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{chartTitle}</CardTitle>
        <CardDescription>{chartDesc}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 25,
              left: 25,
              right: 25,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="createdAt"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value !== null ? value : Date.now());
                return date.toLocaleDateString("default", {
                  month: "short",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="amount"
              type="natural"
              stroke="var(--color-amount)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-amount)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this createdAt <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
