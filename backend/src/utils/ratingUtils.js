import Review from "../models/reviewModel.js";
import Place from "../models/placeModel.js";
import mongoose from "mongoose";
export const updatePlaceRating = async (placeId) => {
  try {
    const objectId = new mongoose.Types.ObjectId(placeId);

    const stats = await Review.aggregate([
      { $match: { place: objectId } },
      {
        $group: {
          _id: "$place",
          avgRating: { $avg: "$rating" },
          count: { $sum: 1 }
        }
      }
    ]);

    const average = stats.length
      ? Number(stats[0].avgRating.toFixed(1))
      : 0;

    const count = stats.length
      ? stats[0].count
      : 0;

    await Place.findByIdAndUpdate(placeId, {
      rating: { average, count }
    });

   
  } catch (err) {
    console.error("updatePlaceRating error:", err);
  }
};
