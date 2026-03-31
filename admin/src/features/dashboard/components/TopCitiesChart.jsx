import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { Skeleton } from "@/components/ui/skeleton";

const CustomXAxisTick = ({ x, y, payload }) => {
  const words = payload.value.split(" ");

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={10}
        textAnchor="middle"
        fill="#9ca3af"
        fontSize={12}
      >
        {words.length > 1 ? (
          <>
            <tspan x="0" dy="0">
              {words[0]}
            </tspan>
            <tspan x="0" dy="14">
              {words.slice(1).join(" ")}
            </tspan>
          </>
        ) : (
          <tspan x="0" dy="0">
            {payload.value}
          </tspan>
        )}
      </text>
    </g>
  );
};

const TopCitiesChart = ({ data, loading }) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-28" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-75 w-full" />
        </CardContent>
      </Card>
    );
  }

  const chartData =
    data?.topCities?.map((c) => ({
      city: c._id || "Unknown",
      bookings: c.count,
    })) || [];

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Top Cities</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="w-full h-75 **:outline-none">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              style={{ outline: "none" }}
              margin={{ top: 10, right: 10, left: 0, bottom: 25 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                strokeOpacity={0.2}
                vertical={false}
              />

              <XAxis
                dataKey="city"
                tickLine={false}
                axisLine={false}
                interval={0}
                height={50}
                tick={<CustomXAxisTick />}
              />

              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />

              <Tooltip
                formatter={(value) => [`${value}`, "Bookings"]}
                labelFormatter={(label) => `City: ${label}`}
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

export default TopCitiesChart;