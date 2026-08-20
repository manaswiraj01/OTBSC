import nodemailer from "nodemailer";

const sendOtpEmail = async (toEmail, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"QuickBook - No Reply" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "QuickBook Email Verification OTP",

      // IMPORTANT:
      // user reply kare to yaha nahi jana chahiye
      replyTo: "no-reply@quickbook.local",

      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 12px;">
          <h2 style="color: #222;">Verify your email</h2>
          <p style="font-size: 15px; color: #444;">
            Use the following OTP to complete your signup on <strong>QuickBook</strong>.
          </p>

          <div style="margin: 24px 0; text-align: center;">
            <div style="display: inline-block; background: #f7f7f7; padding: 16px 28px; border-radius: 10px; font-size: 32px; font-weight: bold; letter-spacing: 10px; color: #111;">
              ${otp}
            </div>
          </div>

          <p style="font-size: 14px; color: #555;">
            This OTP is valid for <strong>5 minutes</strong>.
          </p>

          <p style="font-size: 13px; color: #888; margin-top: 24px;">
            Please do not reply to this email. This mailbox is not monitored.
          </p>
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.error("OTP Email Error:", error.message);
    return false;
  }
};

export default sendOtpEmail;
