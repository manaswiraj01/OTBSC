import express from "express";
import { getMyBookings, cancelBooking, downloadReceipt } from "../controllers/bookingController.js";
import { userAuth } from "../middlewares/userAuth.js";

const router = express.Router();

router.get("/my", userAuth, getMyBookings);
router.put("/:id/cancel", userAuth, cancelBooking);
router.get("/receipt/:id", userAuth, downloadReceipt);

export default router;