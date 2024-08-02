import { AreaChartComponent } from "@/components/charts/area-chart";
import { BarChartComponent } from "@/components/charts/bar-chart";
import { HorizontalBarChartComponent } from "@/components/charts/horizontal-bar-chart";
import { LineChartLabelComponent } from "@/components/charts/line-chart-label";
import { PieChartComponent } from "@/components/charts/pie-chart";

export default function Analytics() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 my-14">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Analytics</h1>
      </div>
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
        <AreaChartComponent />
        <PieChartComponent />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
        <BarChartComponent />
        <LineChartLabelComponent />
        <HorizontalBarChartComponent />
      </div>
    </main>
  );
}
