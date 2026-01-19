import express from "express";
import Admin from "../models/adminModel.js";

const router = express.Router();

router.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const payload = JSON.parse(req.body.toString());
      const { type, data: user } = payload;

      const email = user?.email_addresses?.[0]?.email_address;

      if (type === "user.created") {
        if (!email) {
          return res.status(200).json({ message: "No email found" });
        }

        const allowedAdmins =
          process.env.ADMIN_EMAILS?.split(",") || [];

        if (!allowedAdmins.includes(email)) {
          return res.status(200).json({ message: "Not an admin" });
        }

        const exists = await Admin.findOne({ clerkUserId: user.id });
        if (exists) {
          return res.status(200).json({ message: "Admin already exists" });
        }

        await Admin.create({
          clerkUserId: user.id,
          name:
            `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
            email,
          email,
          photoUrl: user.image_url,
        });

        console.log("✅ Admin created:", email);
        return res.status(200).json({ message: "Admin created" });
      }

      if (type === "user.updated") {
        const admin = await Admin.findOne({ clerkUserId: user.id });
        if (!admin) {
          return res.status(200).json({ message: "Admin not found" });
        }

        admin.name =
          `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
          admin.name;

        if (email) admin.email = email;
        if (user.image_url) admin.photoUrl = user.image_url;

        await admin.save();

        console.log("🔁 Admin updated:", admin.email);
        return res.status(200).json({ message: "Admin updated" });
      }

      if (type === "user.deleted") {
        await Admin.findOneAndDelete({ clerkUserId: user.id });
        console.log("🗑️ Admin deleted:", user.id);
        return res.status(200).json({ message: "Admin deleted" });
      }

      return res.status(200).json({ received: true });
    } catch (err) {
      console.error("❌ Clerk webhook error:", err.message);
      res.status(500).json({ error: "Webhook processing failed" });
    }
  }
);

export default router;
