import express from "express";
import { createCheckoutSession, verifySession } from "../controllers/paymentController.js";
import { userAuth } from "../middlewares/userAuth.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-checkout", userAuth, createCheckoutSession);

paymentRouter.get("/verify-session", verifySession);

export default paymentRouter;