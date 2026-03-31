import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { clerkMiddleware } from "@clerk/express";

import { connectDB } from "./config/database.js";

import userRoutes from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import placeRouter from "./routes/placeRoutes.js";
import locationRouter from "./routes/locationRoutes.js";
import reviewRouter from "./routes/reviewRoute.js";
import clerkWebhook from "./routes/clerkWebhook.js";
import chatbotRouter from "./routes/chatbot.routes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import { stripeWebhook } from "./controllers/paymentController.js";
import helpRouter from "./routes/helpRoute.js";
import updateBookingStatus from "./cron/bookingStatusCron.js";
import startEventCleanupJob from "./utils/eventCleanup.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://16.16.192.97"
    ],
    credentials: true,
  })
);

// Clerk webhook
app.use("/clerk/webhook", clerkWebhook);

// Stripe webhook
app.post(
  "/payment/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

// Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

// ===== PUBLIC ROUTES =====
app.use("/", userRoutes);
app.use("/", placeRouter);
app.use("/", locationRouter);
app.use("/", reviewRouter);
app.use("/events", eventRoutes);
app.use("/chatbot", chatbotRouter);
app.use("/payment", paymentRouter);
app.use("/bookings", bookingRouter);
app.use("/help", helpRouter);

// ===== PROTECTED ADMIN ROUTES =====
app.use("/admin", clerkMiddleware(), adminRouter);
app.use("/admin", clerkMiddleware(), dashboardRoutes);
app.use("/admin", clerkMiddleware(), eventRoutes);

// Optional root test
app.get("/", (req, res) => {
  res.send("API is running...");
});

connectDB()
  .then(() => {
    console.log("Connected to database successfully");
    app.listen(4000, () => {
      console.log("Server is listening on port 4000");
      updateBookingStatus();
      startEventCleanupJob();
    });
  })
  .catch((err) => {
    console.error("Error connecting to database", err);
  });