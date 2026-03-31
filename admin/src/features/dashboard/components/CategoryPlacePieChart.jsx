import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#a855f7", "#06b6d4"];

const CategoryPlacePieChart = ({ data, loading }) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-75 w-full" />
        </CardContent>
      </Card>
    );
  }

  const chartData =
    data?.categoryPlaceCount?.map((item, index) => ({
      name: item._id || "Unknown",
      value: item.count,
      fill: COLORS[index % COLORS.length],
    })) || [];

  const totalPlaces = chartData.reduce((acc, item) => acc + item.value, 0);

  return (
    <Card className="overflow-hidden h-full">
      <CardHeader className="pb-2">
        <CardTitle>Category-Wise Places</CardTitle>
      </CardHeader>

      <CardContent className="pt-0 pb-6">
        {/* Chart Area */}
        <div className="relative w-full h-75 **:outline-none">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={105}
                paddingAngle={4}
                isAnimationActive
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111",
                  border: "1px solid #333",
                  borderRadius: "6px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-4xl font-bold text-white leading-none">
              {totalPlaces}
            </span>
            <span className="mt-1 text-xs text-muted-foreground">
              Places
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-2 grid grid-cols-2 gap-3">
          {chartData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-lg border border-border px-3 py-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-sm text-muted-foreground truncate">
                  {item.name}
                </span>
              </div>

              <span className="text-sm font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryPlacePieChart;