import express from "express";
import { userAuth } from "../middlewares/userAuth.js";
import { handleChatbotStep, deleteSession } from "../controllers/chatbot.controller.js";

const router = express.Router();

router.post("/chat", userAuth, handleChatbotStep);

router.delete("/session", userAuth, deleteSession);

export default router;
