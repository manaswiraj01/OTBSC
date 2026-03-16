import React from "react";
import { format } from "date-fns";

const BookingTable = ({ bookings, openCancelModal }) => {

    return (

        <div className="overflow-x-auto rounded-xl shadow">

            <table className="w-full min-w-[700px] text-left table-fixed">

                <thead className="bg-secondary text-secondary-content">

                    <tr>
                        <th className="p-3 w-[45%]">Place</th>
                        <th className="p-3 w-[15%]">City</th>
                        <th className="p-3 w-[15%]">Visit Date</th>
                        <th className="p-3 w-[10%]">Amount</th>
                        <th className="p-3 w-[15%]">Status</th>
                    </tr>

                </thead>

                <tbody>

                    {bookings.length === 0 ? (

                        <tr>
                            <td colSpan="5" className="text-center py-8 text-base-content/70">
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

                                <tr key={booking._id}>

                                    <td className="p-3">{booking.placeId?.name}</td>

                                    <td className="p-3">{booking.placeId?.city}</td>

                                    <td className="p-3">
                                        {format(new Date(booking.visitDate), "dd MMM yyyy")}
                                    </td>

                                    <td className="p-3">₹{booking.totalAmount}</td>

                                    <td className="p-3 whitespace-nowrap">

                                        {canCancel ? (

                                            <button
                                                onClick={() => openCancelModal(booking)}
                                                className="px-3 py-1 text-xs sm:text-sm bg-red-700 text-white rounded-md cursor-pointer"
                                            >
                                                Cancel Booking
                                            </button>

                                        ) : booking.refundStatus === "Pending" ? (

                                            <span className="">Refund Pending</span>

                                        ) : booking.refundStatus === "Refunded" ? (

                                            <span className="">Refunded</span>

                                        ) : booking.bookingStatus === "Completed" ? (

                                            <span className="">Completed</span>

                                        ) : (

                                            <span className="">Cancellation Closed</span>

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
