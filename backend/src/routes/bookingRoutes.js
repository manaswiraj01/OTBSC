import express from "express";
import { getMyBookings, cancelBooking } from "../controllers/bookingController.js";
import { userAuth } from "../middlewares/userAuth.js";

const router = express.Router();

router.get("/my", userAuth, getMyBookings);
router.put("/:id/cancel", userAuth, cancelBooking);

export default router;