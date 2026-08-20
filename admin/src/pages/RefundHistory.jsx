import { useEffect, useState } from "react";
import api from "@/api/axiosInstance";
import Pagination from "@/components/Pagination";
import PageLoader from "@/components/common/PageLoader";

const RefundHistory = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const [refunds, setRefunds] = useState([]);
  const [totalRefunded, setTotalRefunded] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const token = await getToken();

      console.log(token);

      const res = await api.get(`/refund-history?page=${page}&limit=${limit}`);

      setRefunds(res.data.refunds || []);
      setTotal(res.data.total || 0);

      // 👇 IMPORTANT
      setTotalRefunded(res.data.totalRefundedAmount || 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchHistory();
  }, [page, limit]);

  if (loading) {
    return <PageLoader text="Fetching refund history..." />;
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-xl p-6 bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow">
            <p className="text-sm opacity-90">Refunded Count</p>
            <h2 className="text-3xl font-bold">{total}</h2>
          </div>

          <div className="rounded-xl p-6 bg-linear-to-r from-green-400 to-green-600 text-white shadow">
            <p className="text-sm opacity-90">Total Refunded Amount</p>
            <h2 className="text-3xl font-bold">₹{totalRefunded}</h2>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-50 dark:bg-zinc-900/60 rounded-2xl shadow border border-white/5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-zinc-400 border-b border-white/5">
              <tr>
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-6 py-3 text-left">Place</th>
                <th className="px-6 py-3 text-left">City</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Refund Date</th>
                <th className="px-6 py-3 text-left">Amount</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {refunds.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-zinc-400">
                    No Refund History
                  </td>
                </tr>
              )}

              {refunds.map((r) => (
                <tr key={r._id}>
                  <td className="px-6 py-4 text-white">{r.userId?.name}</td>

                  <td className="px-6 py-4 text-zinc-300">{r.name}</td>

                  <td className="px-6 py-4 text-zinc-300">{r.city}</td>

                  <td className="px-6 py-4 text-zinc-300">{r.userId?.email}</td>

                  <td className="px-6 py-4 text-zinc-300">
                    {new Date(r.refundedAt).toLocaleDateString("en-IN")}
                  </td>

                  <td className="px-6 py-4 text-green-400 font-medium">
                    ₹{r.totalAmount}
                  </td>
                </tr>
              ))}
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

export default RefundHistory;
