import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { handleChatbotStep } from "../controllers/chatbot.controller.js";

const router = express.Router();

router.post("/chat", userAuth, handleChatbotStep);

export default router;
