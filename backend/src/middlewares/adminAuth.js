import { getAuth } from "@clerk/express";
import Admin from "../models/adminModel.js";

const adminAuth = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const admin = await Admin.findOne({ clerkUserId: userId });

    if (!admin) {
      return res.status(403).json({ message: "Admin access denied" });
    }

    req.admin = admin;
    next();
  } catch (err) {
    console.error("Admin auth error:", err);
    res.status(500).json({ message: "Admin auth failed" });
  }
};

export default adminAuth;
