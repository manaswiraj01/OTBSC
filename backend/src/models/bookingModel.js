import mongoose from "mongoose";

const ticketDetailSchema = new mongoose.Schema(
  {
    visitorType: {
      type: String,
      enum: [
        "Indian Student",
        "Indian Adult",
        "Foreigner Student",
        "Foreigner Adult",
      ],
      required: true,
    },
    numberOfTickets: {
      type: Number,
      min: 1,
      required: true,
    },
    totalPrice: {
      type: Number,
      min: 0,
      required: true,
    },
  },
  { _id: false }
);

const bookingSchema = new mongoose.Schema(
  {
    bookingRef: {
      type: String,
      unique: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    placeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },

    name: String,
    category: String,
    address: String,
    city: String,
    state: String,
    pincode: String,

    visitDate: {
      type: Date,
      required: true,
    },

    ticketDetails: {
      type: [ticketDetailSchema],
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentIntentId: {
      type: String,
      unique: true,
      sparse: true,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    bookingStatus: {
      type: String,
      enum: ["Booked", "Cancelled", "Completed"],
      default: "Booked",
    },

    refundStatus: {
      type: String,
      enum: ["NotInitiated", "Pending", "Refunded"],
      default: "NotInitiated",
    },

    //Receipt feature fields
    receiptFileName: {
      type: String,
      default: "",
    },

    receiptGeneratedAt: {
      type: Date,
      default: null,
    },

    // Optional future use
    emailSent: {
      type: Boolean,
      default: false,
    },

    emailSentAt: {
      type: Date,
      default: null,
    },

    cancelledAt: Date,
    refundedAt: Date,
  },
  { timestamps: true }
);

//Fast refund query for admin
bookingSchema.index({ refundStatus: 1 });

//Optional helpful indexes
bookingSchema.index({ userId: 1, createdAt: -1 });

//Auto generate booking reference
bookingSchema.pre("save", function (next) {
  if (!this.bookingRef) {
    this.bookingRef = "BK" + Date.now();
  }
  next();
});

export default mongoose.model("Booking", bookingSchema);