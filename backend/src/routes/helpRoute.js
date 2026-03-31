import express from "express";
import nodemailer from "nodemailer";
import multer from "multer";
import {userAuth} from "../middlewares/userAuth.js";


const router = express.Router();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Multer Configuration
const upload = multer({
  storage: multer.memoryStorage(), // store in RAM (for email attachment)
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB max
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only images and videos are allowed"), false);
    }
  },
});

router.post(
  "/",
  userAuth,
  upload.single("attachment"), // 👈 MUST match frontend name
  async (req, res) => {
    try {
      console.log("File received:", req.file); // debug

      const {
        mobile,
        bookingId,
        issueType,
        subIssueType,
        title,
        description,
      } = req.body;

      const userName = req.user.name;
      const userEmail = req.user.email;

      // Nodemailer config here

      await transporter.sendMail({
        from: `"OTBSC Support" <${process.env.EMAIL_USER}>`,
        to: process.env.SUPPORT_EMAIL,
        replyTo: userEmail,
        subject: `Help Request - ${issueType}`,
        html: `
          <h3>New Help Request</h3>
          <p><strong>Name:</strong> ${userName}</p>
          <p><strong>Email:</strong> ${userEmail}</p>
          <p><strong>Mobile:</strong> ${mobile}</p>
          <p><strong>Booking ID:</strong> ${bookingId}</p>
          <p><strong>Description:</strong></p>
          <p>${description}</p>
        `,
        attachments: req.file
          ? [
              {
                filename: req.file.originalname,
                content: req.file.buffer,
              },
            ]
          : [],
      });

      res.status(200).json({ message: "Success" });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;