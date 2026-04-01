import dotenv from "dotenv";
import fs from "fs";
import path from "path";

import { connectDB } from "../config/database.js";
import Booking from "../models/bookingModel.js";
import User from "../models/userModel.js";
import { generateReceipt } from "../utils/generateReceipt.js";

dotenv.config({ path: "./.env" });

const regenerateAllReceipts = async () => {
  try {
    await connectDB();
    console.log("Connected to DB");

    // =========================
    // Step 1: Delete old receipt PDF files
    // =========================
    const receiptsDir = path.join(process.cwd(), "receipts");

    if (fs.existsSync(receiptsDir)) {
      const files = fs.readdirSync(receiptsDir);

      for (const file of files) {
        if (file.endsWith(".pdf")) {
          fs.unlinkSync(path.join(receiptsDir, file));
        }
      }

      console.log("Old receipt PDF files deleted");
    } else {
      fs.mkdirSync(receiptsDir, { recursive: true });
      console.log("Receipts folder created");
    }

    // =========================
    // Step 2: Reset DB receipt fields
    // =========================
    await Booking.updateMany(
      { paymentStatus: "Paid" },
      {
        $set: {
          receiptFileName: "",
          receiptGeneratedAt: null,
        },
      }
    );

    console.log("Old receipt fields reset in DB");

    // =========================
    // Step 3: Re-fetch bookings AFTER reset
    // =========================
    const bookings = await Booking.find({ paymentStatus: "Paid" });

    console.log(`Found ${bookings.length} paid bookings`);

    let successCount = 0;
    let failCount = 0;

    for (const booking of bookings) {
      try {
        const user = await User.findById(booking.userId);

        const { fileName, filePath } = await generateReceipt(booking, user);

        // 🔥 safest DB update
        await Booking.findByIdAndUpdate(booking._id, {
          $set: {
            receiptFileName: fileName,
            receiptGeneratedAt: new Date(),
          },
        });

        console.log(`Receipt regenerated for: ${booking.bookingRef}`);
        console.log(`Saved file: ${filePath}`);
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

regenerateAllReceipts();