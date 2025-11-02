import mongoose from "mongoose";

const ticketDetailSchema = new mongoose.Schema(
  {
    visitorType: {
      type: String,
      enum: {
        values: [
          "Indian Student",
          "Indian Adult",
          "Foreigner Student",
          "Foreigner Adult",
        ],
        message:
          "Visitor type must be one of: Indian Student, Indian Adult, Foreigner Student, Foreigner Adult",
      },
      required: [true, "Visitor type is required"],
    },
    numberOfTickets: {
      type: Number,
      required: [true, "Number of tickets is required"],
      min: [1, "At least one ticket must be booked"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      min: [0, "Price cannot be negative"],
    },
  },
  { _id: false } 
);

const bookingSchema = new mongoose.Schema(
  {
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
    name: {
      type: String,
      required: [true, "Place name is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: {
        values: ["Museum", "Wildlife", "Monument"],
        message: "Category must be one of: Museum, Wildlife, or Monument",
      },
      required: [true, "Category is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    pincode: {
      type: String,
      required: [true, "Pincode is required"],
      validate: {
        validator: function (v) {
          return /^[1-9][0-9]{5}$/.test(v);
        },
        message: "Invalid Indian PIN code format (should be 6 digits)",
      },
    },
    visitDate: {
      type: Date,
      required: [true, "Visit date is required"],
    },
    ticketDetails: {
      type: [ticketDetailSchema], 
      required: [true, "Ticket details are required"],
    },
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount must be at least 0"],
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
