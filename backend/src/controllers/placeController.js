import Place from "../models/placeModel.js";

export const getPlaces = async (req, res) => {
  const sort = req.query.sort;

  let query = Place.find();

  if (sort === "top") {
    query = query.sort({
      "rating.average": -1,
      "rating.count": -1
    });
  } else {
    query = query.sort({ createdAt: -1 });
  }

  const places = await query;
  res.json({ data: places });
};

export const getPlace = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ success: false, message: "Place not found" });
    res.status(200).json({ success: true, data: place });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error while fetching place" });
  }
};

export const getCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const validCategories = ["Museum", "Wildlife", "Monument"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }
    const places = await Place.find({ category });
    if (places.length === 0) {
      return res.status(404).json({ success: false, message: "No places found for the given category" });
    }
    res.status(200).json({ success: true, data: places });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error while fetching places by category" });
  }
};

export const getTopRatedPlace = async (req, res) => {
  try {
    const { category } = req.query;

    const places = await Place.find({
      category,
      "rating.average": { $gte: 4.5 }
    })
      .sort({ "rating.average": -1, "rating.count": -1 })
      .limit(8);

    res.status(200).json({
      success: true,
      data: places
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching top rated places"
    });
  }
};