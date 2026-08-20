import { useEffect, useState } from "react";
import api from "@/api/axiosInstance";
import Pagination from "@/components/Pagination";
import PageLoader from "@/components/common/PageLoader";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
  });

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, [page, limit]);

  const fetchBookings = async () => {
    try {
      const res = await api.get(`/booking-stats?page=${page}&limit=${limit}`);

      setBookings(res.data.bookings || []);
      setTotal(res.data.total || 0);

      setStats({
        totalBookings: res.data.totalBookings,
        totalRevenue: res.data.totalRevenue,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader text="Fetching booking details..." />;
  }

  return (
    <div className="p-6 overflow-x-hidden">
      {/* ===== STATS ===== */}

      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-xl p-6 bg-[linear-gradient(135deg,#f97316,#ef4444)] text-white shadow">
            <p className="text-sm opacity-90">Total Bookings</p>
            <h2 className="text-3xl font-bold">{stats.totalBookings}</h2>
          </div>

          <div className="rounded-xl p-6 bg-[linear-gradient(135deg,#3b82f6,#1e40af)] text-white shadow">
            <p className="text-sm opacity-90">Total Revenue</p>
            <h2 className="text-3xl font-bold">
              ₹{(stats.totalRevenue || 0).toLocaleString("en-IN")}
            </h2>
          </div>
        </div>
      </div>

      {/* ===== TABLE ===== */}

      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-zinc-900/60 rounded-2xl shadow border border-zinc-200 dark:border-white/5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-black dark:text-zinc-400 border-b border-zinc-200 dark:border-white/5">
              <tr>
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-6 py-3 text-left max-w-[260px]">Place</th>
                <th className="px-6 py-3 text-left">Visit Date</th>
                <th className="px-6 py-3 text-left max-w-[200px]">Visitors</th>
                <th className="px-6 py-3 text-left">Tickets</th>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Booking Status</th>
                <th className="px-6 py-3 text-left">Payment Status</th>
                <th className="px-6 py-3 text-left">Refund Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-200 dark:divide-white/5">
              {bookings.length === 0 && (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center py-6 text-zinc-500 dark:text-zinc-400"
                  >
                    No Bookings Found
                  </td>
                </tr>
              )}

              {bookings.map((booking) => {
                const totalTickets =
                  booking.ticketDetails?.reduce(
                    (sum, t) => sum + t.numberOfTickets,
                    0,
                  ) || 0;

                // Payment display logic
                let paymentDisplay = booking.paymentStatus;

                if (booking.bookingStatus === "Cancelled") {
                  if (booking.refundStatus === "Pending") {
                    paymentDisplay = "Refund Pending";
                  } else if (booking.refundStatus === "Refunded") {
                    paymentDisplay = "Refunded";
                  }
                }

                // Refund display
                const refundStatusMap = {
                  NotInitiated: "Not Requested",
                  Pending: "Refund Pending",
                  Refunded: "Refunded",
                };

                const refundDisplay =
                  refundStatusMap[booking.refundStatus] || booking.refundStatus;

                return (
                  <tr
                    key={booking._id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                  >
                    {/* USER */}

                    <td className="px-6 py-4 text-zinc-900 dark:text-white">
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {booking.userId?.name}
                        </span>

                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          {booking.userId?.email}
                        </span>
                      </div>
                    </td>

                    {/* PLACE */}

                    <td className="px-6 py-4 text-zinc-700 dark:text-zinc-300 max-w-[260px]">
                      <div className="font-medium break-words">
                        {booking.name}
                      </div>

                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        {booking.city}, {booking.state}
                      </div>
                    </td>

                    {/* VISIT DATE */}

                    <td className="px-6 py-4 text-zinc-700 dark:text-zinc-300">
                      {new Date(booking.visitDate).toLocaleDateString("en-IN")}
                    </td>

                    {/* VISITORS */}

                    <td className="px-6 py-4 text-zinc-700 dark:text-zinc-300">
                      <div className="flex flex-col gap-1">
                        {booking.ticketDetails?.map((ticket, i) => (
                          <span key={i}>
                            {ticket.visitorType} ({ticket.numberOfTickets})
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* TICKETS */}

                    <td className="px-6 py-4 text-zinc-700 dark:text-zinc-300">
                      {totalTickets}
                    </td>

                    {/* AMOUNT */}

                    <td className="px-6 py-4 text-green-600 dark:text-green-400 font-medium">
                      ₹{booking.totalAmount}
                    </td>

                    {/* BOOKING STATUS */}

                    <td className="px-6 py-4 text-zinc-700 dark:text-zinc-300">
                      {booking.bookingStatus}
                    </td>

                    {/* PAYMENT STATUS */}

                    <td className="px-6 py-4 text-zinc-700 dark:text-zinc-300">
                      {paymentDisplay}
                    </td>

                    {/* REFUND STATUS */}

                    <td className="px-6 py-4 text-zinc-700 dark:text-zinc-300">
                      {refundDisplay}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Pagination
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            total={total}
          />
        </div>
      </div>
    </div>
  );
};

export default Bookings;
