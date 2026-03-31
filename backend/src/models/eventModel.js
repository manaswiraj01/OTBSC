import mongoose from "mongoose";
import validator from "validator";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      minlength: [3, "Event title must be at least 3 characters"],
      maxlength: [120, "Event title cannot exceed 120 characters"],
    },

    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
      minlength: [20, "Description must be at least 20 characters"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },

    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      required: [true, "Place is required for an event"],
    },

    eventDate: {
      type: Date,
      required: [true, "Event date is required"],
      validate: {
        validator: function (value) {
          return value >= new Date().setHours(0, 0, 0, 0);
        },
        message: "Event date cannot be in the past",
      },
    },

    startTime: {
      type: String,
      required: [true, "Start time is required"],
      match: [/^\d{2}:\d{2}$/, "Start time must be in HH:MM format"],
    },

    bannerImage: {
      type: String,
      required: [true, "Banner image is required"],
      trim: true,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid banner image URL");
        }
      },
    },
  },
  { timestamps: true }
);

eventSchema.index({ title: 1, place: 1, eventDate: 1 }, { unique: true });

const Event = mongoose.model("Event", eventSchema);

export default Event;