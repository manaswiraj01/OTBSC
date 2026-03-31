import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";
import {
  CalendarDays,
  IndianRupee,
  Ban,
  MapPin,
  Landmark,
} from "lucide-react";

const formatNumber = (num) => {
  return num?.toLocaleString("en-IN");
};

const formatCurrency = (num) => {
  return `₹${Number(num || 0).toLocaleString("en-IN")}`;
};

const QuickInsightsPanel = ({ data, loading }) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </CardContent>
      </Card>
    );
  }

  const insights = data?.insights || {};

  const items = [
    {
      title: "Today's Bookings",
      value: formatNumber(insights.todayBookings || 0),
      icon: CalendarDays,
    },
    {
      title: "Today's Revenue",
      value: formatCurrency(insights.todayRevenue || 0),
      icon: IndianRupee,
    },
    {
      title: "Cancelled Today",
      value: formatNumber(insights.todayCancelled || 0),
      icon: Ban,
    },
    {
      title: "Top City",
      value: insights.topCity || "N/A",
      icon: MapPin,
    },
    {
      title: "Top Place",
      value: insights.topPlace || "N/A",
      icon: Landmark,
    },
    {
      title: "Top Place Revenue",
      value: formatCurrency(insights.topPlaceRevenue || 0),
      icon: IndianRupee,
    },
  ];

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Quick Insights</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl border border-border px-4 py-3"
            >
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">{item.title}</p>
                <p className="text-base font-semibold truncate">{item.value}</p>
              </div>

              <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default QuickInsightsPanel;