import express from "express";
import { getPlaces, getPlace, getCategory, getTopRatedPlace } from "../controllers/placeController.js";

const router = express.Router();

router.get("/places", getPlaces);
router.get("/public/get/place/:id", getPlace);
router.get("/get/places/category/:category", getCategory);
router.get("/get/top-rated", getTopRatedPlace);

export default router;