import React from "react";

const BookingStats = ({ bookings }) => {

  const refunded = bookings.filter(
    b => b.refundStatus === "Refunded"
  ).length;

  const completed = bookings.filter(
    b => b.bookingStatus === "Completed"
  ).length;

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

      <div className="bg-accent text-accent-content p-6 rounded-xl">
        <p>Total Bookings</p>
        <h2 className="text-3xl font-bold">{bookings.length}</h2>
      </div>

      <div className="bg-secondary text-secondary-content p-6 rounded-xl">
        <p>Completed</p>
        <h2 className="text-3xl font-bold">{completed}</h2>
      </div>

      <div className="bg-primary text-neutral-content p-6 rounded-xl">
        <p>Refunded</p>
        <h2 className="text-3xl font-bold">{refunded}</h2>
      </div>

    </div>

  );

};

export default BookingStats;
