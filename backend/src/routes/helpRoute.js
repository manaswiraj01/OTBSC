import express from "express";
import multer from "multer";
import { Resend } from "resend";
import { userAuth } from "../middlewares/userAuth.js";

const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

// Multer Configuration
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 25 * 1024 * 1024, // 25MB
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
    upload.single("attachment"),

    async (req, res) => {
        try {
            console.log("========== HELP REQUEST ==========");
            console.log("Body:", req.body);
            console.log("File:", req.file ? req.file.originalname : "No file");
            console.log("User:", req.user?.email);

            const {
                mobile,
                bookingId,
                issueType,
                subIssueType,
                title,
                description,
            } = req.body;

            const userName = req.user?.name || "User";
            const userEmail = req.user?.email;

            if (!userEmail) {
                return res.status(400).json({
                    message: "User email not found",
                });
            }

            const attachments = req.file
                ? [
                      {
                          filename: req.file.originalname,
                          content: req.file.buffer,
                      },
                  ]
                : [];

            const { data, error } = await resend.emails.send({
                from: "QuickBook Support <onboarding@quick-book.in>",
                to: [process.env.SUPPORT_EMAIL],
                replyTo: userEmail,

                subject: `Help Request - ${issueType}`,

                html: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6;">

                        <h2>New Help Request</h2>

                        <p>
                            <strong>Name:</strong>
                            ${userName}
                        </p>

                        <p>
                            <strong>Email:</strong>
                            ${userEmail}
                        </p>

                        <p>
                            <strong>Mobile:</strong>
                            ${mobile || "Not provided"}
                        </p>

                        <p>
                            <strong>Booking ID:</strong>
                            ${bookingId || "Not provided"}
                        </p>

                        <p>
                            <strong>Issue Type:</strong>
                            ${issueType}
                        </p>

                        <p>
                            <strong>Sub Issue:</strong>
                            ${subIssueType}
                        </p>

                        <p>
                            <strong>Title:</strong>
                            ${title}
                        </p>

                        <p>
                            <strong>Description:</strong>
                        </p>

                        <p>
                            ${description}
                        </p>

                    </div>
                `,

                attachments,
            });

            if (error) {
                console.error("Resend Help Email Error:", error);

                return res.status(500).json({
                    message: "Failed to send help request",
                    error: error.message,
                });
            }

            console.log("Help email sent successfully:", data);

            return res.status(200).json({
                success: true,
                message: "Help request sent successfully",
            });

        } catch (error) {
            console.error("Help Request Error:", error);

            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
);

export default router;