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
      <div className="lg:hidden">
        <LineChartComponent />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        <div className="hidden lg:block">
          <LineChartComponent />
        </div>
        <LineChartComponent />
        <LineChartComponent />
      </div>
    </main>
  );
}
