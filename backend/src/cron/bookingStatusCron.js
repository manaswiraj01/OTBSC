import cron from "node-cron";
import Booking from "../models/bookingModel.js";

const updateBookingStatus = () => {

  // run every 10 minutes (better than once per day)
  cron.schedule("*/10 * * * *", async () => {

    try {

      const now = new Date();

      const result = await Booking.updateMany(
        {
          visitDate: { $lt: now },
          bookingStatus: "Booked",
          refundStatus: "NotInitiated",
          paymentStatus: "Paid"
        },
        {
          $set: { bookingStatus: "Completed" }
        }
      );

      if (result.modifiedCount > 0) {
        console.log("Completed bookings updated:", result.modifiedCount);
      }

    } catch (error) {
      console.log("Cron error:", error);
    }

  });

};

export default updateBookingStatus;