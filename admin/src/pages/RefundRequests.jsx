import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { BASE_URL_ADMIN } from "@/lib/constants";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import RefundApproveModal from "@/components/RefundApproveModal";
import Pagination from "@/components/Pagination";
import PageLoader from "@/components/common/PageLoader";

const RefundRequests = () => {

    const { getToken } = useAuth();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);

    const [refunds, setRefunds] = useState([]);
    const [amountToRefund, setAmountToRefund] = useState(0);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);
    const [selectedRefund, setSelectedRefund] = useState(null);

    const fetchRefunds = async () => {

        try {

            const token = await getToken();

            const res = await axios.get(
                `${BASE_URL_ADMIN}/refunds?page=${page}&limit=${limit}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const bookings = res.data.bookings || [];

            setRefunds(bookings);

            // pagination total
            setTotal(res.data.total || 0);

            setAmountToRefund(res.data.pendingAmount || 0);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        setLoading(true);
        fetchRefunds();
    }, [page, limit]);

    const approveRefund = async () => {

        try {

            setProcessingId(selectedRefund._id);

            const token = await getToken();

            await axios.put(
                BASE_URL_ADMIN + `/refunds/${selectedRefund._id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Refund Approved");

            // remove row
            setRefunds(prev =>
                prev.filter(r => r._id !== selectedRefund._id)
            );

            // update pending count instantly
            setTotal(prev => prev - 1);

            // update amount instantly
            setAmountToRefund(prev =>
                prev - selectedRefund.totalAmount
            );

            setSelectedRefund(null);

        } catch (error) {

            toast.error("Refund failed");

        } finally {

            setProcessingId(null);

        }
    };

    if (loading) {
        return <PageLoader text="Fetching refund requests..." />
    }

    return (

        <div className="p-6">

            {/* ================= STATS ================= */}

            <div className="max-w-7xl mx-auto mb-8">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                    <div className="rounded-xl p-6 bg-linear-to-r from-orange-600 to-orange-800  text-white shadow">
                        <p className="text-sm opacity-90">
                            Pending Refunds
                        </p>

                        <h2 className="text-3xl font-bold">
                            {total}
                        </h2>
                    </div>

                    <div className="rounded-xl p-6 bg-linear-to-r from-green-500 to-green-700 text-white shadow">
                        <p className="text-sm opacity-90">
                            Amount To Refund
                        </p>

                        <h2 className="text-3xl font-bold">
                            ₹{amountToRefund}
                        </h2>
                    </div>

                </div>

            </div>

            {/* ================= TABLE ================= */}

            <div className="max-w-7xl mx-auto">

                <div className="bg-gray-50 dark:bg-zinc-900/60 rounded-2xl shadow border border-white/5 overflow-x-auto">

                    <table className="w-full text-sm">

                        <thead className="text-zinc-400 border-b border-white/5">

                            <tr>

                                <th className="px-6 py-3 text-left">User</th>
                                <th className="px-6 py-3 text-left">Place</th>
                                <th className="px-6 py-3 text-left">City</th>
                                <th className="px-6 py-3 text-left">Email</th>
                                <th className="px-6 py-3 text-left">Visit Date</th>
                                <th className="px-6 py-3 text-left">Amount</th>
                                <th className="px-6 py-3 text-right">Action</th>

                            </tr>

                        </thead>

                        <tbody className="divide-y divide-white/5">

                            {refunds.length === 0 && (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="text-center py-6 text-zinc-400"
                                    >
                                        No Refund Requests
                                    </td>

                                </tr>

                            )}

                            {refunds.map((booking) => (

                                <tr key={booking._id}>

                                    <td className="px-6 py-4 text-white">
                                        {booking.userId?.name}
                                    </td>

                                    <td className="px-6 py-4 text-zinc-300">
                                        {booking.placeId?.name}
                                    </td>

                                    <td className="px-6 py-4 text-zinc-300">
                                        {booking.placeId?.city}
                                    </td>

                                    <td className="px-6 py-4 text-zinc-300">
                                        {booking.userId?.email}
                                    </td>

                                    <td className="px-6 py-4 text-zinc-300">
                                        {new Date(booking.visitDate).toLocaleDateString("en-IN")}
                                    </td>

                                    <td className="px-6 py-4 text-zinc-300">
                                        ₹{booking.totalAmount}
                                    </td>

                                    <td className="px-6 py-4 text-right">

                                        <Button
                                            size="sm"
                                            disabled={processingId === booking._id}
                                            className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 text-xs"
                                            onClick={() => setSelectedRefund(booking)}
                                        >
                                            {processingId === booking._id ? "Processing..." : "Approve"}
                                        </Button>

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



            <RefundApproveModal
                open={!!selectedRefund}
                booking={selectedRefund}
                loading={processingId === selectedRefund?._id}
                onClose={() => setSelectedRefund(null)}
                onConfirm={() =>
                    approveRefund(
                        selectedRefund._id,
                        selectedRefund.totalAmount
                    )
                }
            />

        </div>
    );
};

export default RefundRequests;