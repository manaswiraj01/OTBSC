import express from "express";
import { getDashboardData } from "../controllers/dashboardController.js";
import adminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

router.get("/dashboard",adminAuth, getDashboardData);

export default router;