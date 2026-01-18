import Review from "../models/reviewModel.js";
import Place from "../models/placeModel.js";

export const updatePlaceRating = async (placeId) => {
  const stats = await Review.aggregate([
    { $match: { place: placeId } },
    {
      $group: {
        _id: "$place",
        avgRating: { $avg: "$rating" },
        count: { $sum: 1 }
      }
    }
  ]);

  if (stats.length > 0) {
    await Place.findByIdAndUpdate(placeId, {
      rating: {
        average: stats[0].avgRating.toFixed(1),
        count: stats[0].count
      }
    });
  } else {
    await Place.findByIdAndUpdate(placeId, {
      rating: { average: 0, count: 0 }
    });
  }
};
