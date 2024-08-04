"use client";
import { IncomeBarChartComponent } from "./components/charts/bar-chart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowUpRight,
  ChartNoAxesCombined,
  Download,
  HandCoins,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { DatePickerWithRange } from "./components/date-range-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataProps {
  netWorth: number;
  totalIncome: number;
  totalExpenses: number;
  incomeDirection: {
    direction: "up" | "down";
    by: number;
  };
  recentExpenses: {
    id: string;
    name: string;
    amount: number;
    type: "one_time" | "recurring";
    createdAt: Date;
  }[];
  income: {
    id: string;
    name: string;
    amount: number;
    type: "one_time" | "recurring";
    createdAt: Date;
    new_income: {
      id: string;
      amount: number;
      createdAt: Date;
    }[];
  }[];
}

/*
`${new Date().getFullYear()}-${new Date()
        .getMonth()
        .toString()
        .padStart(2, "0")}-01`
*/

export default function Dashboard() {
  const { user } = useUser();
  const [data, setData] = useState<DataProps>();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  const getInitialData = async () => {
    try {
      if (date?.from && date.to) {
        const values = await axios.get(
          `/api/dashboard?id=${user?.id}&date_range=${JSON.stringify(date)}`
        );
        setData(values.data);
      }
    } catch (error) {
      toast(`${error}`);
    }
  };
  useEffect(() => {
    getInitialData();
  }, [date]);

  if (!data) {
    return <>loading...</>;
  }
  return (
    <>
      <div className="flex-1 space-y-4 px-4 md:px-8 pt-6">
        <div className="flex flex-wrap items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex flex-wrap gap-2 items-center  justify-between w-full md:w-auto">
            <DatePickerWithRange date={date} setDate={setDate} />
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </div>
      <Tabs
        defaultValue="overview"
        className="space-y-4 px-4 md:px-8 py-4 md:py-8"
      >
        <TabsList className="flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics" disabled>
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" disabled>
            Reports
          </TabsTrigger>
          {/* <TabsTrigger value="notifications" disabled>
            Notifications
          </TabsTrigger> */}
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <main className="flex flex-1 flex-col gap-4 md:gap-4">
            <div className="grid gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
              <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Net worth
                  </CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹ {data.netWorth}</div>
                  {/* <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p> */}
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Income
                  </CardTitle>
                  <ChartNoAxesCombined className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div
                    className={`text-2xl font-bold  ${
                      data.totalIncome !== 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    +{data.totalIncome}
                  </div>
                  {/* <p className="text-xs text-muted-foreground">
                    +180.1% from last month
                  </p> */}
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Expenses
                  </CardTitle>
                  <HandCoins className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div
                    className={`text-2xl font-bold ${
                      data.totalExpenses === 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    +{data.totalExpenses}
                  </div>
                  {/* <p className="text-xs text-muted-foreground">
                    +19% from last month
                  </p> */}
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Now
                  </CardTitle>
                  {data.incomeDirection.direction === "up" ? (
                    <TrendingUp className="h-4 w-4  text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4  text-red-500" />
                  )}
                </CardHeader>
                <CardContent>
                  <div
                    className={`text-2xl font-bold ${
                      data.incomeDirection.direction === "up"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {data.incomeDirection.direction === "up" ? "+" : "-"}
                    {data.incomeDirection.by}
                  </div>
                  {/* <p className="text-xs text-muted-foreground">
                    +201 since last hour
                  </p> */}
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:gap-8 md:grid-cols-2">
              <IncomeBarChartComponent
                chartData={data.income}
                chartTitle="Income Bar Chart"
                chartDateRange={`For the last ${data.income.length} incomes`}
                desc1={`Trending ${data.incomeDirection.direction} by ${
                  (data.totalIncome / data.incomeDirection.by) * 100
                }% this month`}
                desc2={`Showing total income for the last ${data.income.length} incomes`}
              />

              <Card className="">
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle>Recent Expenses</CardTitle>
                    <CardDescription>Recent expenses of yours.</CardDescription>
                  </div>
                  <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="/dashboard/expenses">
                      View All
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[25%]">Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Type</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.recentExpenses.map((data, i) => {
                        const date = new Date(
                          data.createdAt !== null ? data.createdAt : Date.now()
                        );
                        return (
                          <TableRow key={i}>
                            <TableCell>
                              {" "}
                              {date.toLocaleDateString("default", {
                                weekday: "short",
                              })}{" "}
                              {date.toLocaleDateString("default", {
                                day: "2-digit",
                              })}{" "}
                              {date.toLocaleDateString("default", {
                                month: "short",
                              })}{" "}
                              {date.toLocaleDateString("default", {
                                year: "2-digit",
                              })}
                            </TableCell>
                            <TableCell>{data.name}</TableCell>
                            <TableCell className="text-right">
                              {data.type === "one_time"
                                ? "One Time"
                                : "Recurring"}
                            </TableCell>
                            <TableCell className="text-right">
                              ₹ {data.amount}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </main>
        </TabsContent>
      </Tabs>
    </>
  );
}
