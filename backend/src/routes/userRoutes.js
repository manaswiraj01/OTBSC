import express from "express";
const router = express.Router();

import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  editUserProfile,
  verifySignupOtp,
  cancelSignupSession
} from "../controllers/userController.js";

import { userAuth } from "../middlewares/userAuth.js";

router.post("/signup", registerUser);
router.post("/signup/verify-otp", verifySignupOtp);
router.post("/signup/cancel", cancelSignupSession);

router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/profile/view", userAuth, getUserProfile);
router.patch("/profile/edit", userAuth, editUserProfile);

export default router;