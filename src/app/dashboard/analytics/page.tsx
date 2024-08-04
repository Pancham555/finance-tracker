"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "sonner";
import { PieChartComponent } from "./components/pie-chart-for-income-expense";
import { BarChartComponent } from "./components/bar-chart";
import { LineChartComponent } from "./components/line-chart";
import { PieChartForTypeComponent } from "./components/pie-chart-for-type";

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
      <div className="space-y-6">
        <div className="text-2xl font-semibold">
          Your income and expense distributions
        </div>
        <div className="grid gap-4 md:grid-cols-2 grid-cols-1 lg:grid-cols-3">
          <PieChartComponent
            totalIncome={data.totalIncome}
            totalExpenses={data.totalExpenses}
            netWorth={`₹${data.netWorth}`}
            chartTitle="Income and Expense Distribution"
            chartDesc=" "
            bottomDesc1={`${
              data.totalIncome > data.totalExpenses ? "Income" : "Expenses"
            } takes most in this distribution`}
            bottomDesc2="Shows the distribution of your income and expenses"
          />
          <PieChartForTypeComponent
            chartData={data?.income.map((obj) => ({
              ...obj,
              fill:
                obj.type === "recurring"
                  ? "var(--color-recurring)"
                  : "var(--color-one_time)",
            }))}
            netWorth={`₹${data.totalIncome}`}
            chartTitle="Income Distribution"
            chartDesc=" "
            bottomDesc1={`You have ${data.income.length} sources of income`}
            bottomDesc2="Shows the distribution on One Time and Recurring incomes"
          />
          <PieChartForTypeComponent
            chartData={data?.expenses.map((obj) => ({
              ...obj,
              fill:
                obj.type === "recurring"
                  ? "var(--color-recurring)"
                  : "var(--color-one_time)",
            }))}
            netWorth={`₹${data.totalExpenses}`}
            chartTitle="Expenses Distribution"
            chartDesc=" "
            bottomDesc1={`You have ${data.expenses.length} sources of expenses`}
            bottomDesc2="Shows the distribution on One Time and Recurring expenses"
          />
        </div>
      </div>
      <div className="space-y-2 mt-5">
        <div className="text-2xl font-semibold">
          Your Income sources (Recurring only)
        </div>
        <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2">
          {data.income.map((value, i) => {
            const date = new Date(
              value.createdAt !== null ? value.createdAt : Date.now()
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
            if (value.type === "recurring") {
              return (
                <LineChartComponent
                  key={i}
                  chartTitle={`Line chart of ${value.name}`}
                  chartDesc={`Last income on ${dateString}`}
                  chartData={value.new_income}
                  lineTitle={value.name}
                />
              );
            }
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
            if (data.type === "recurring") {
              return (
                <LineChartComponent
                  key={i}
                  chartTitle={`Line chart of ${data.name}`}
                  chartDesc={`Last expense on ${dateString}`}
                  chartData={data.new_expense}
                  lineTitle={data.name}
                />
              );
            }
          })}
        </div>
      </div>
    </main>
  );
}
