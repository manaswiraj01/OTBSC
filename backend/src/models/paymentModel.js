import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,

    paymentStatus: {
      type: String,
      enum: ["CREATED", "SUCCESS", "FAILED"],
      default: "CREATED"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
