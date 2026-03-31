import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const CategoryChart = ({ data, loading }) => {
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
    data?.categoryBreakdown?.map((item) => ({
      category: item._id || "Unknown",
      bookings: item.count,
    })) || [];

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Category-Wise Booking Breakdown</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="w-full h-80 **:outline-none">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              style={{ outline: "none" }}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                strokeOpacity={0.2}
                vertical={false}
              />

              <XAxis
                dataKey="category"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                angle={-20}
                textAnchor="end"
                interval={0}
                height={60}
              />

              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#111",
                  border: "1px solid #333",
                  borderRadius: "6px",
                }}
                cursor={{ fill: "transparent" }}
              />

              <Bar
                dataKey="bookings"
                radius={[8, 8, 0, 0]}
                fill="#3b82f6"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryChart;