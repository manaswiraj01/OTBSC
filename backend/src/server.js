
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

// ================= CORS =================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.CLIENT_URL,
  process.env.ADMIN_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin
      // (Postman, server-to-server requests, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ================= WEBHOOKS =================

// Clerk webhook
app.use("/clerk/webhook", clerkWebhook);

// Stripe webhook
// IMPORTANT: express.raw() must come before express.json()
app.post(
  "/payment/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

// ================= BODY PARSERS =================

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

// ================= PUBLIC ROUTES =================

app.use("/", userRoutes);
app.use("/", placeRouter);
app.use("/", locationRouter);
app.use("/", reviewRouter);

app.use("/events", eventRoutes);
app.use("/chatbot", chatbotRouter);
app.use("/payment", paymentRouter);
app.use("/bookings", bookingRouter);
app.use("/help", helpRouter);

// ================= PROTECTED ADMIN ROUTES =================

app.use("/admin", clerkMiddleware(), adminRouter);
app.use("/admin", clerkMiddleware(), dashboardRoutes);
app.use("/admin", clerkMiddleware(), eventRoutes);

// ================= HEALTH CHECK =================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "QuickBook API is running...",
  });
});

// ================= SERVER =================

const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    console.log("Connected to database successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is listening on port ${PORT}`);

      updateBookingStatus();
      startEventCleanupJob();
    });
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
    process.exit(1);
  });

