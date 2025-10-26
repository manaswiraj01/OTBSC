import express from "express";
import Place from "../models/placeModel.js";
import { adminAuth } from "../middlewares/adminAuth.js";
import cloudinary from "../utils/cloudinary.js";
import { validateLocation } from "../utils/validation.js";
import { MAX_IMAGE_COUNT } from "../utils/constants.js";
import { formatName, deleteImageFromCloudinary } from "../utils/cloudinaryHelpers.js";

const placeRouter = express.Router();

// ADD PLACE
placeRouter.post("/add/place", adminAuth, async (req, res) => {
  try {
    const { name, state, city, pincode, photoUrls, ...rest } = req.body;

    const locCheck = await validateLocation(state, city, pincode);
    if (!locCheck.success) return res.status(400).json(locCheck);

    const placeName = formatName(name);
    const uploadedUrls = [];

    for (let i = 0; i < photoUrls.length; i++) {
      const public_id = `places/${placeName}_${i + 1}`;
      const uploadRes = await cloudinary.uploader.upload(photoUrls[i], {
        public_id,
        transformation: [
          { width: 1000, height: 750, crop: "fill", gravity: "auto" },
          { quality: "auto" },
          { fetch_format: "auto" },
        ],
      });
      uploadedUrls.push(uploadRes.secure_url);
    }

    const newPlace = await Place.create({
      name,
      state,
      city,
      pincode,
      photoUrls: uploadedUrls,
      ...rest,
    });

    res.status(201).json({
      success: true,
      message: "Place added successfully",
      data: newPlace,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error while adding place" });
  }
});

// GET ALL PLACES
placeRouter.get("/get/places", adminAuth, async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json({ success: true, data: places });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error while fetching places" });
  }
});

// GET PLACE BY ID
placeRouter.get("/get/place/:id", adminAuth, async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ success: false, message: "Place not found" });
    res.status(200).json({ success: true, data: place });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error while fetching place" });
  }
});

// UPDATE PLACE
placeRouter.patch("/update/place/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const place = await Place.findById(id);
    if (!place) return res.status(404).json({ success: false, message: "Place not found" });

    const { state, city, pincode, name, photoUrls } = updates;

    if (state || city || pincode) {
      if (!state || !city || !pincode)
        return res.status(400).json({ success: false, message: "To update location, all of 'state', 'city', and 'pincode' must be provided." });
      const locCheck = await validateLocation(state, city, pincode);
      if (!locCheck.success) return res.status(400).json(locCheck);
    }

    let finalUrls = place.photoUrls;

    if (photoUrls && photoUrls.length > 0) {
      if (photoUrls.length > MAX_IMAGE_COUNT)
        return res.status(400).json({ success: false, message: `Maximum ${MAX_IMAGE_COUNT} images allowed.` });

      for (const oldUrl of place.photoUrls) {
        await deleteImageFromCloudinary(oldUrl);
      }

      const newName = formatName(name || place.name);
      finalUrls = [];
      for (let i = 0; i < photoUrls.length; i++) {
        const public_id = `places/${newName}_${i + 1}`;
        const uploadRes = await cloudinary.uploader.upload(photoUrls[i], {
          public_id,
          transformation: [
            { width: 1000, height: 750, crop: "fill", gravity: "auto" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        });
        finalUrls.push(uploadRes.secure_url);
      }
    }

    if (!photoUrls && name && name !== place.name) {
      const oldName = formatName(place.name);
      const newName = formatName(name);

      const renamedUrls = [];
      for (let i = 0; i < place.photoUrls.length; i++) {
        const oldPublicId = `places/${oldName}_${i + 1}`;
        const newPublicId = `places/${newName}_${i + 1}`;
        const renamed = await cloudinary.uploader.rename(oldPublicId, newPublicId);
        renamedUrls.push(renamed.secure_url);
      }
      finalUrls = renamedUrls;
    }

    const updatedPlace = await Place.findByIdAndUpdate(id, { ...updates, photoUrls: finalUrls }, { new: true, runValidators: true });

    res.status(200).json({ success: true, message: "Place updated successfully", data: updatedPlace });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error while updating place" });
  }
});

// DELETE PLACE
placeRouter.delete("/delete/place/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const place = await Place.findById(id);
    if (!place) return res.status(404).json({ success: false, message: "Place not found" });

    for (const url of place.photoUrls) {
      await deleteImageFromCloudinary(url);
    }

    await Place.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Place deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error while deleting place" });
  }
});

export default placeRouter;
