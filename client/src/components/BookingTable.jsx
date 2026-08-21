import React from "react";
import { format } from "date-fns";
import { Download } from "lucide-react";

const BookingTable = ({
    bookings,
    openCancelModal,
    downloadReceiptHandler,
}) => {
    return (
        <div className="overflow-x-auto rounded-xl shadow">
            <table className="w-full min-w-[900px] text-left table-fixed">
                <thead className="bg-gradient-to-r from-[#7b61ff] to-[#ff4fa3] text-white">
                    <tr>
                        <th className="p-3 w-[32%]">Place</th>
                        <th className="p-3 w-[14%]">City</th>
                        <th className="p-3 w-[14%]">Visit Date</th>
                        <th className="p-3 w-[10%]">Amount</th>
                        <th className="p-3 w-[15%]">Receipt</th>
                        <th className="p-3 w-[15%]">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {bookings.length === 0 ? (
                        <tr>
                            <td
                                colSpan="6"
                                className="text-center py-8 text-base-content/70"
                            >
                                No bookings found for the selected filters.
                            </td>
                        </tr>
                    ) : (
                        bookings.map((booking) => {
                            const now = new Date();
                            const visitDate = new Date(booking.visitDate);

                            const canCancel =
                                now < visitDate &&
                                booking.bookingStatus === "Booked" &&
                                booking.refundStatus === "NotInitiated";

                            return (
                                <tr
                                    key={booking._id}
                                    className="border-b border-white/5"
                                >
                                    <td className="p-3">
                                        {booking.name}
                                    </td>

                                    <td className="p-3">
                                        {booking.city}
                                    </td>

                                    <td className="p-3">
                                        {format(
                                            new Date(booking.visitDate),
                                            "dd MMM yyyy"
                                        )}
                                    </td>

                                    <td className="p-3">
                                        ₹{booking.totalAmount}
                                    </td>

                                    {/* Receipt Column */}
                                    <td className="p-3">
                                        <button
                                            onClick={() =>
                                                downloadReceiptHandler(
                                                    booking._id
                                                )
                                            }
                                            className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 border border-[#7b61ff] text-[#7b61ff] hover:bg-[#7b61ff] hover:text-white cursor-pointer"
                                        >
                                            <Download size={15} />
                                            Receipt
                                        </button>
                                    </td>

                                    <td className="p-3 whitespace-nowrap">
                                        {canCancel ? (
                                            <button
                                                onClick={() =>
                                                    openCancelModal(booking)
                                                }
                                                className="px-3 py-1 text-xs sm:text-sm bg-red-700 text-white rounded-md cursor-pointer"
                                            >
                                                Cancel Booking
                                            </button>
                                        ) : booking.refundStatus ===
                                          "Pending" ? (
                                            <span>
                                                Refund Pending
                                            </span>
                                        ) : booking.refundStatus ===
                                          "Refunded" ? (
                                            <span>Refunded</span>
                                        ) : booking.bookingStatus ===
                                          "Completed" ? (
                                            <span>Completed</span>
                                        ) : (
                                            <span>
                                                Cancellation Closed
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BookingTable;