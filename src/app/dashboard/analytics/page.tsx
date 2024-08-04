"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "sonner";
import { PieChartComponent } from "./components/pie-chart";
import { BarChartComponent } from "./components/bar-chart";
import { LineChartComponent } from "./components/line-chart";

interface DataProps {
  netWorth: number;
  totalIncome: number;
  totalExpenses: number;
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
  expenses: {
    id: string;
    name: string;
    amount: number;
    type: "one_time" | "recurring";
    createdAt: Date;
    new_expense: {
      id: string;
      amount: number;
      createdAt: Date;
    }[];
  }[];
}

export default function Analytics() {
  const [data, setData] = useState<DataProps>();
  const { user } = useUser();
  const getInitialData = async () => {
    try {
      const values = await axios.get(`/api/analytics?id=${user?.id}`);
      setData(values.data);
    } catch (error) {
      toast(`${error}`);
    }
  };
  useEffect(() => {
    getInitialData();
  }, []);

  if (!data) {
    return <>loading...</>;
  }
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Analytics</h1>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <BarChartComponent />
        <PieChartComponent
          totalIncome={data.totalIncome}
          totalExpenses={data.totalExpenses}
          netWorth={`${data.netWorth}`}
        />
      </div>
      <div className="space-y-2 mt-5">
        <div className="text-2xl font-semibold">Your Income sources</div>
        <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2">
          {data.income.map((data, i) => {
            const date = new Date(
              data.createdAt !== null ? data.createdAt : Date.now()
            );
            const dateString =
              date.toLocaleDateString("default", {
                weekday: "short",
              }) +
              " " +
              date.toLocaleDateString("default", {
                day: "2-digit",
              }) +
              " " +
              date.toLocaleDateString("default", {
                month: "short",
              }) +
              " " +
              date.toLocaleDateString("default", {
                year: "2-digit",
              });
            return (
              <LineChartComponent
                key={i}
                chartTitle={`Line chart of ${data.name}`}
                chartDesc={`Last income on ${dateString}`}
                chartData={data.new_income}
                lineTitle={data.name}
              />
            );
          })}
        </div>
      </div>
      <div className="space-y-2 mt-5">
        <div className="text-2xl font-semibold">Your expenses</div>
        <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2">
          {data.expenses.map((data, i) => {
            const date = new Date(
              data.createdAt !== null ? data.createdAt : Date.now()
            );
            const dateString =
              date.toLocaleDateString("default", {
                weekday: "short",
              }) +
              " " +
              date.toLocaleDateString("default", {
                day: "2-digit",
              }) +
              " " +
              date.toLocaleDateString("default", {
                month: "short",
              }) +
              " " +
              date.toLocaleDateString("default", {
                year: "2-digit",
              });
            return (
              <LineChartComponent
                key={i}
                chartTitle={`Line chart of ${data.name}`}
                chartDesc={`Last expense on ${dateString}`}
                chartData={data.new_expense}
                lineTitle={data.name}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
