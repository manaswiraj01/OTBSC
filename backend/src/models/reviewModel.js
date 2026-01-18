import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      minlength: 3,
      maxlength: 500,
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent same user reviewing same place twice
reviewSchema.index({ user: 1, place: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema);
