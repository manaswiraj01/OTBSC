import express from "express";
import adminAuth from "../middlewares/adminAuth.js";
import User from "../models/userModel.js";

const adminRouter = express.Router();

adminRouter.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

export default adminRouter;
