import cron from "node-cron";
import Booking from "../models/bookingModel.js";

const updateBookingStatus = () => {
  // every 10 minutes
  cron.schedule("*/10 * * * *", async () => {
    try {
      // 🔥 Today start in server local time
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const result = await Booking.updateMany(
        {
          visitDate: { $lt: todayStart },
          bookingStatus: "Booked",
          refundStatus: "NotInitiated",
          paymentStatus: "Paid",
        },
        {
          $set: { bookingStatus: "Completed" },
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