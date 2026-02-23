import express from "express";
import { createCheckoutSession } from "../controllers/paymentController.js";
import { userAuth } from "../middlewares/auth.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-checkout", userAuth, createCheckoutSession);



export default paymentRouter;