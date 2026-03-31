import nodemailer from "nodemailer";
import Booking from "../models/bookingModel.js";
import User from "../models/userModel.js";
import Place from "../models/placeModel.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEventNotificationEmails = async (event) => {
  try {
    // place details
    const place = await Place.findById(event.place);
    if (!place) return;

    // all bookings of this place
    const bookings = await Booking.find({ placeId: event.place }).select("userId");

    if (!bookings.length) {
      console.log("📭 No booked users found for this place");
      return;
    }

    // unique user ids
    const uniqueUserIds = [...new Set(bookings.map((b) => b.userId.toString()))];

    // fetch users
    const users = await User.find({
      _id: { $in: uniqueUserIds },
    }).select("name email");

    if (!users.length) {
      console.log("📭 No valid users found for email");
      return;
    }

    // format date
    const formattedDate = new Date(event.eventDate).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // send mail to each user
    for (const user of users) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: `New Event at ${place.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #e91e63;">New Event Alert 🎉</h2>
            <p>Hello <strong>${user.name}</strong>,</p>

            <p>A new event has been announced at a place you booked before:</p>

            <div style="border:1px solid #ddd; border-radius:10px; padding:15px; margin:20px 0;">
              <h3 style="margin:0 0 10px;">${event.title}</h3>
              <p style="margin:8px 0;"><strong>Place:</strong> ${place.name}</p>
              <p style="margin:8px 0;"><strong>Date:</strong> ${formattedDate}</p>
              <p style="margin:8px 0;"><strong>Time:</strong> ${event.startTime}</p>
              <p style="margin:8px 0;"><strong>Description:</strong> ${event.description}</p>
            </div>

            <p>We thought you’d like to know since you’ve booked this place before.</p>

            <p style="margin-top:20px;">Regards,<br><strong>QuickBook Team</strong></p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    }

    console.log(`Event notification emails sent to ${users.length} users`);
  } catch (err) {
    console.error("Event Email Error:", err.message);
  }
};