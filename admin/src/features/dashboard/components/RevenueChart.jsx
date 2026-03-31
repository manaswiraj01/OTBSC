import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const formatCurrency = (value = 0) => {
    return `₹${Number(value).toLocaleString("en-IN")}`;
};

// 🔥 Clean Y-axis formatter
const formatYAxis = (value) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`; // Crore
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`; // Lakh
    if (value >= 1000) return `₹${(value / 1000).toFixed(1)}k`; // Thousand
    return `₹${value}`;
};

// 🔥 Convert raw step into a clean "nice" step
const getNiceStep = (value) => {
    const exponent = Math.floor(Math.log10(value));
    const fraction = value / Math.pow(10, exponent);

    let niceFraction;

    if (fraction <= 1) niceFraction = 1;
    else if (fraction <= 2) niceFraction = 2;
    else if (fraction <= 5) niceFraction = 5;
    else niceFraction = 10;

    return niceFraction * Math.pow(10, exponent);
};

// 🔥 Fully dynamic Y-axis config
const getYAxisConfig = (maxValue, tickCount = 5) => {
    if (maxValue <= 0) {
        return {
            domainMax: 1000,
            ticks: [0, 250, 500, 750, 1000],
        };
    }

    const rawStep = maxValue / tickCount;
    const niceStep = getNiceStep(rawStep);
    const domainMax = Math.ceil(maxValue / niceStep) * niceStep;

    const ticks = [];
    for (let i = 0; i <= domainMax; i += niceStep) {
        ticks.push(i);
    }

    return { domainMax, ticks };
};

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    const revenue = payload[0]?.value || 0;
    const bookings = payload[0]?.payload?.bookings || 0;
    const fullMonth = payload[0]?.payload?.fullMonth || label;

    return (
        <div className="rounded-xl border border-border bg-background px-4 py-3 shadow-md">
            <p className="text-sm font-medium text-foreground">{fullMonth}</p>

            <p className="text-sm text-muted-foreground mt-1">
                Revenue:{" "}
                <span className="font-semibold text-foreground">
                    {formatCurrency(revenue)}
                </span>
            </p>

            <p className="text-sm text-muted-foreground">
                Bookings:{" "}
                <span className="font-semibold text-foreground">{bookings}</span>
            </p>
        </div>
    );
};

const RevenueChart = ({ data, loading }) => {
    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-56" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-80 w-full" />
                </CardContent>
            </Card>
        );
    }

    const chartData = data?.revenue || [];

    const currentMonthRevenue = chartData[chartData.length - 1]?.revenue || 0;
    const previousMonthRevenue = chartData[chartData.length - 2]?.revenue || 0;

    const growth =
        previousMonthRevenue > 0
            ? (((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100).toFixed(1)
            : 0;

    const maxRevenue = Math.max(...chartData.map((item) => item.revenue || 0), 0);

    const { domainMax, ticks } = getYAxisConfig(maxRevenue);

    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <CardTitle>Revenue Trends</CardTitle>
                    <CardDescription>
                        Monthly revenue for the last 12 months
                    </CardDescription>
                </div>

                <div className="text-left sm:text-right">
                    <p className="text-2xl font-semibold tracking-tight">
                        {formatCurrency(currentMonthRevenue)}
                    </p>
                    <p
                        className={`text-sm font-medium ${Number(growth) >= 0 ? "text-green-600" : "text-red-500"
                            }`}
                    >
                        {Number(growth) >= 0 ? "+" : ""}
                        {growth}% vs last month
                    </p>
                </div>
            </CardHeader>

            <CardContent>
                <div className="h-85 w-full **:outline-none">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={chartData}
                            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                        >
                            <defs>
                                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.03} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                strokeOpacity={0.15}
                                vertical={false}
                            />

                            <XAxis
                                dataKey="fullMonth"
                                tick={{ fontSize: 11 }}
                                tickLine={false}
                                axisLine={false}
                                interval={0}
                                angle={-20}
                                textAnchor="end"
                                height={60}
                            />

                            <YAxis
                                ticks={ticks}
                                domain={[0, domainMax]}
                                tickFormatter={formatYAxis}
                                tick={{ fontSize: 12 }}
                                tickLine={false}
                                axisLine={false}
                                width={70}
                                allowDecimals={false}
                            />

                            <Tooltip content={<CustomTooltip />} />

                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#3b82f6"
                                strokeWidth={2.5}
                                fill="url(#revenueFill)"
                                dot={{ r: 3 }}
                                activeDot={{ r: 6 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default RevenueChart;