import mongoose from "mongoose";

const chatbotSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    currentStep: {
      type: String,
      enum: [
        "GREETING",
        "STATE_SELECTION",
        "CITY_SELECTION",
        "CATEGORY_SELECTION",
        "PLACE_SELECTION",
        "TICKET_SELECTION",
        "CONFIRM_BOOKING",
        "PAYMENT",
        "COMPLETED",
        "DISCARDED"
      ],
      default: "GREETING"
    },

    selectedState: {
      type: String,
      trim: true
    },

    selectedCity: {
      type: String,
      trim: true
    },

    selectedCategory: {
      type: String,
      enum: ["Museum", "Wildlife", "Monument"]
    },

    selectedPlace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place"
    },

    visitDate: Date,

    tickets: [
      {
        visitorType: {
          type: String,
          enum: [
            "Indian Student",
            "Indian Adult",
            "Foreigner Student",
            "Foreigner Adult"
          ]
        },
        quantity: {
          type: Number,
          min: 1
        },
        price: Number
      }
    ],

    totalAmount: {
      type: Number,
      min: 0
    },

    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking"
    },

    isActive: {
      type: Boolean,
      default: true
    },

    discardedAt: Date
  },
  { timestamps: true }
);

export default mongoose.model("ChatbotSession", chatbotSessionSchema);
