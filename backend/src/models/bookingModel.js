import mongoose from "mongoose";

const ticketDetailSchema = new mongoose.Schema(
  {
    visitorType: {
      type: String,
      enum: [
        "Indian Student",
        "Indian Adult",
        "Foreigner Student",
        "Foreigner Adult"
      ],
      required: true
    },
    numberOfTickets: {
      type: Number,
      min: 1,
      required: true
    },
    totalPrice: {
      type: Number,
      min: 0,
      required: true
    }
  },
  { _id: false }
);

const bookingSchema = new mongoose.Schema(
  {
    bookingRef: {
      type: String,
      unique: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    placeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      required: true
    },

    name: String,
    category: String,
    address: String,
    city: String,
    state: String,
    pincode: String,

    visitDate: {
      type: Date,
      required: true
    },

    ticketDetails: {
      type: [ticketDetailSchema],
      required: true
    },

    totalAmount: {
      type: Number,
      required: true
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
