import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Users, Ticket, IndianRupee, AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const formatNumber = (num) => {
  return num?.toLocaleString("en-IN");
};

const KPISection = ({ stats, loading }) => {
  // 🔹 Loading State
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // 🔹 KPI Config
  const kpis = [
    {
      title: "Total Users",
      value: formatNumber(stats?.totalUsers || 0),
      icon: Users,
    },
    {
      title: "Total Bookings",
      value: formatNumber(stats?.totalBookings || 0),
      icon: Ticket,
    },
    {
      title: "Revenue",
      value: `₹${formatNumber(stats?.revenue || 0)}`,
      icon: IndianRupee,
    },
    {
      title: "Pending Refunds",
      value: formatNumber(stats?.pendingRefunds || 0),
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((item, index) => {
        const Icon = item.icon;

        return (
          <Card
            key={index}
            className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.title}
              </CardTitle>

              <div className="h-9 w-9 rounded-lg bg-muted/60 flex items-center justify-center">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-semibold tracking-tight">
                {item.value}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default KPISection;