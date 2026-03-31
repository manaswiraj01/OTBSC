import KPISection from "@/features/dashboard/components/KPISection";
import MainChart from "@/features/dashboard/components/MainChart";
import RevenueChart from "@/features/dashboard/components/RevenueChart";
import TopCitiesChart from "@/features/dashboard/components/TopCitiesChart";
import BookingStatusChart from "@/features/dashboard/components/BookingStatusChart";
import QuickInsightsPanel from "@/features/dashboard/components/QuickInsightsPanel";
import CategoryChart from "@/features/dashboard/components/CategoryChart";
import CategoryPlacePieChart from "@/features/dashboard/components/CategoryPlacePieChart";
import useDashboardData from "@/features/dashboard/hooks/useDashboardData";

const Dashboard = () => {
  const { data, loading, refetch } = useDashboardData();

  return (
    <div className="space-y-6">
      {/* KPI */}
      <KPISection stats={data?.stats} loading={loading} refetch={refetch} />

      {/* Row 1 */}
      <div className="grid gap-6 lg:grid-cols-3 w-full">
        <div className="lg:col-span-2 min-w-0">
          <MainChart data={data?.trends} loading={loading} refetch={refetch} />
        </div>

        <div className="min-w-0">
          <TopCitiesChart data={data} loading={loading} refetch={refetch} />
        </div>
      </div>

      {/* Row 2 */}
      <div className="w-full min-w-0">
        <RevenueChart data={data?.trends} loading={loading} refetch={refetch} />
      </div>

      {/* Row 3 */}
      <div className="grid gap-6 lg:grid-cols-2 w-full">
        <div className="min-w-0">
          <BookingStatusChart data={data} loading={loading} />
        </div>

        <div className="min-w-0">
          <CategoryPlacePieChart data={data} loading={loading} />
        </div>
      </div>

      {/* Row 4 */}
      <div className="grid gap-6 lg:grid-cols-2 w-full">
        <div className="min-w-0">
          <QuickInsightsPanel data={data} loading={loading} />
        </div>

        <div className="min-w-0">
          <CategoryChart data={data} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;