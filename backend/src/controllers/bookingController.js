import Stripe from "stripe";
import Booking from "../models/bookingModel.js";
import path from "path";
import fs from "fs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (booking.bookingStatus === "Cancelled") {
      return res.status(400).json({ message: "Booking already cancelled" });
    }

    if (booking.refundStatus === "Refunded") {
      return res.status(400).json({ message: "Already refunded" });
    }

    if (booking.refundStatus === "Pending") {
      return res.status(400).json({ message: "Refund already requested" });
    }

    if (booking.paymentStatus !== "Paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    const now = new Date();
    const visitDate = new Date(booking.visitDate);

    if (now >= visitDate) {
      return res.status(400).json({
        message: "Cancellation time expired",
      });
    }

    booking.bookingStatus = "Cancelled";
    booking.refundStatus = "Pending";
    booking.cancelledAt = new Date();

    await booking.save();

    res.json({
      success: true,
      message: "Booking cancelled. Refund request sent to admin.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate("placeId", "name category city state")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const downloadReceipt = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (!booking.receiptFileName) {
      return res.status(404).json({ message: "Receipt not available" });
    }

    const filePath = path.join(process.cwd(), "receipts", booking.receiptFileName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Receipt file not found" });
    }

    return res.download(filePath);
  } catch (error) {
    console.error("Download receipt error:", error);
    res.status(500).json({ message: error.message });
  }
};