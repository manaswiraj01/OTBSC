import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["UPI", "CreditCard", "DebitCard", "NetBanking"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["Success", "Failed", "Pending"],
    default: "Pending",
  },
  transactionId: {
    type: String,
    unique: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
