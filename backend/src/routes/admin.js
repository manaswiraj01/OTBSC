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

adminRouter.delete("/users/:userId", adminAuth, async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete user
    await user.deleteOne();

    res.status(200).json({
      message: "User deleted successfully",
      userId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting user" });
  }
});


export default adminRouter;
