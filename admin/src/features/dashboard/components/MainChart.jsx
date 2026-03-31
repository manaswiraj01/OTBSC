import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { Skeleton } from "@/components/ui/skeleton";

// 🔥 Safe date formatter for YYYY-MM-DD -> 24 Mar
const formatChartDate = (dateStr) => {
  if (!dateStr) return "";

  const [year, month, day] = dateStr.split("-");
  const safeDate = new Date(`${year}-${month}-${day}T00:00:00+05:30`);

  return safeDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};

const MainChart = ({ data, loading }) => {
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
    data?.bookings?.map((item) => ({
      date: formatChartDate(item._id), // 🔥 always 24 Mar format
      bookings: item.count,
    })) || [];

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Booking Trends (Last 7 Days)</CardTitle>
      </CardHeader>

      <CardContent>
        {/* 🔥 responsive + outline fix preserved */}
        <div className="w-full h-75 **:outline-none">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              style={{ outline: "none" }}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />

              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
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

              <Line
                type="monotone"
                dataKey="bookings"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                stroke="#3b82f6"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MainChart;