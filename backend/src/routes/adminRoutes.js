import express from "express";
import adminAuth from "../middlewares/adminAuth.js";
import { getUsers, deleteUser, getPendingRefundRequests, approveRefund, getRefundStats, getRefundHistory, getBookingStats, addPlace, getPlacesAdmin, getPlaceAdmin, updatePlace, deletePlace } from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", adminAuth, getUsers);
router.delete("/users/:userId", adminAuth, deleteUser);

router.get("/refunds", adminAuth, getPendingRefundRequests);
router.put("/refunds/:id", adminAuth, approveRefund);
router.get("/refund-stats", adminAuth, getRefundStats);
router.get("/refund-history", adminAuth, getRefundHistory);
router.get("/booking-stats", adminAuth, getBookingStats);

router.post("/add/place", adminAuth, addPlace);
router.get("/get/places", adminAuth, getPlacesAdmin);
router.get("/get/place/:id", adminAuth, getPlaceAdmin);
router.patch("/update/place/:id", adminAuth, updatePlace);
router.delete("/delete/place/:id", adminAuth, deletePlace);

export default router;