import express from "express";
import { adminAuth } from "../middlewares/adminAuth.js";
import User from "../models/userModel.js";

const adminAccessRouter = express.Router();


adminAccessRouter.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find({}, "-password"); 

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error while fetching users" });
  }
});







export default adminAccessRouter;