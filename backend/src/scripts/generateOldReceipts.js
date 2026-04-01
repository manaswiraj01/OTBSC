import dotenv from "dotenv";
import { connectDB } from "../config/database.js";
import Booking from "../models/bookingModel.js";
import User from "../models/userModel.js";
import { generateReceipt } from "../utils/generateReceipt.js";

dotenv.config();

const generateOldReceipts = async () => {
  try {
    await connectDB();
    console.log("Connected to DB");

    const bookings = await Booking.find({
      $or: [
        { receiptFileName: { $exists: false } },
        { receiptFileName: "" },
        { receiptFileName: null },
      ],
      paymentStatus: "Paid",
    });

    console.log(`Found ${bookings.length} bookings without receipt`);

    let successCount = 0;
    let failCount = 0;

    for (const booking of bookings) {
      try {
        const user = await User.findById(booking.userId);

        const { fileName } = await generateReceipt(booking, user);

        booking.receiptFileName = fileName;
        booking.receiptGeneratedAt = new Date();

        await booking.save();

        console.log(`Receipt generated for: ${booking.bookingRef}`);
        successCount++;
      } catch (err) {
        console.log(`Failed for: ${booking.bookingRef || booking._id}`);
        console.log(err.message);
        failCount++;
      }
    }

    console.log("\nDone");
    console.log(`Success: ${successCount}`);
    console.log(`Failed: ${failCount}`);

    process.exit(0);
  } catch (error) {
    console.log("Script Error:", error.message);
    process.exit(1);
  }
};

generateOldReceipts();