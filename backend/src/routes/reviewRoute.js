import express from "express";
import Review from "../models/reviewModel.js";
import { userAuth } from "../middlewares/auth.js";
import { updatePlaceRating } from "../utils/ratingUtils.js";

const reviewRouter = express.Router();

// PUBLIC: Get reviews
reviewRouter.get("/public/reviews/:placeId", async (req, res) => {
  try {
    const reviews = await Review.find({
      place: req.params.placeId
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: reviews });
  } catch {
    res.status(500).json({ success: false });
  }
});

// CREATE review
reviewRouter.post("/reviews/:placeId", userAuth, async (req, res) => {
  try {
    console.log("USER:", req.user);
    console.log("PLACE ID:", req.params.placeId);
    console.log("BODY:", req.body);
    const review = await Review.create({
      user: req.user._id,
      place: req.params.placeId,
      rating: req.body.rating,
      comment: req.body.comment
    });

    await updatePlaceRating(req.params.placeId);

    res.status(201).json({ success: true, data: review });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this place"
      });
    }
    res.status(500).json({ success: false });
  }
});

// UPDATE review

reviewRouter.patch("/reviews/:id", userAuth, async (req, res) => {
  const { rating, comment } = req.body;

  const review = await Review.findById(req.params.id);
  if (!review) {
    return res.status(404).json({ message: "Not found" });
  }

  if (review.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  review.rating = rating;
  review.comment = comment;
  await review.save();

  await updatePlaceRating(review.place);

  res.json({ message: "Review updated", review });
});


// DELETE review
reviewRouter.delete("/reviews/:id", userAuth, async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review || review.user.toString() !== req.user.id) {
    return res.status(403).json({ success: false });
  }

  const placeId = review.place;
  await review.deleteOne();
  await updatePlaceRating(placeId);

  res.json({ success: true });
});

export default reviewRouter;
