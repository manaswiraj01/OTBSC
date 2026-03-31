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

      <div className="bg-gradient-to-r from-[#7b61ff] to-[#ff4fa3] text-white p-6 rounded-xl">
        <p>Total Bookings</p>
        <h2 className="text-3xl font-bold">{bookings.length}</h2>
      </div>

      <div className="bg-gradient-to-r from-[#ff4fa3] to-[#ff7a18] text-white p-6 rounded-xl">
        <p>Completed</p>
        <h2 className="text-3xl font-bold">{completed}</h2>
      </div>

      <div className=" bg-gradient-to-r from-[#4776E6] to-[#8E54E9] text-white p-6 rounded-xl">
        <p>Refunded</p>
        <h2 className="text-3xl font-bold">{refunded}</h2>
      </div>

    </div>

  );

};

export default BookingStats;
