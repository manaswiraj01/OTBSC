import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text, html, attachments = [] }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
      attachments,
    });

    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Email send error:", error.message);
    throw error;
  }
};