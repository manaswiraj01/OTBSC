import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOtpEmail = async (toEmail, otp) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "QuickBook <onboarding@resend.dev>",
      to: [toEmail],
      subject: "QuickBook Email Verification OTP",

      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>QuickBook Email Verification</h2>

          <p>Your OTP is:</p>

          <h1>${otp}</h1>

          <p>This OTP is valid for 5 minutes.</p>

          <p>If you did not request this OTP, please ignore this email.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Email Error:", error);
      return false;
    }

    console.log("OTP Email sent:", data);
    return true;

  } catch (error) {
    console.error("OTP Email Error:", error);
    return false;
  }
};

export default sendOtpEmail;