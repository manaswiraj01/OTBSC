import express from "express";
import adminAuth from "../middlewares/adminAuth.js";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getEventById
} from "../controllers/event.controller.js";

const router = express.Router();

router.post("/events/create", adminAuth, createEvent);
router.patch("/events/update/:eventId", adminAuth, updateEvent);
router.delete("/events/delete/:eventId", adminAuth, deleteEvent);
router.get("/events", adminAuth, getAllEvents);
router.get("/events/:eventId", adminAuth, getEventById);

router.get("/", getAllEvents);
router.get("/:eventId", getEventById);

export default router;