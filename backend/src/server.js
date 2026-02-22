import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { clerkMiddleware } from "@clerk/express";

import { connectDB } from "./config/database.js";

import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import adminRouter from "./routes/admin.js";
import placeRouter from "./routes/place.js";
import locationRouter from "./routes/locationRoutes.js";
import reviewRouter from "./routes/reviewRoute.js";
import clerkWebhook from "./routes/clerkWebhook.js";
import chatbotRoutes from "./routes/chatbot.routes.js";


dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use("/clerk/webhook", clerkWebhook);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

app.use(clerkMiddleware());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", placeRouter);
app.use("/", locationRouter);
app.use("/", reviewRouter);

app.use("/admin", adminRouter);

app.use("/chatbot", chatbotRoutes);

connectDB()
  .then(() => {
    console.log("Connected to database successfully");
    app.listen(4000, () => {
      console.log("Server is listening on port 4000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to database", err);
  });
