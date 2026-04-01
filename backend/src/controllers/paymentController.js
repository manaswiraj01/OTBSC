import Stripe from "stripe";
import ChatbotSession from "../models/chatbotSessionModal.js";
import Booking from "../models/bookingModel.js";
import Place from "../models/placeModel.js";
import User from "../models/userModel.js";
import { generateReceipt } from "../utils/generateReceipt.js";
import { sendEmail } from "../utils/sendEmail.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("Webhook signature failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    try {
      const sessionData = event.data.object;
      const userId = sessionData.metadata.userId;

      // 🔥 IMPORTANT: Save Payment Intent ID (for refund later)
      const paymentIntentId = sessionData.payment_intent;

      // 🔎 Get active chatbot session
      const chatbotSession = await ChatbotSession.findOne({
        user: userId,
        isActive: true,
      });

      if (!chatbotSession) return res.json({ received: true });

      // 🔎 Get place details
      const place = await Place.findById(chatbotSession.selectedPlace);
      if (!place) return res.json({ received: true });

      // 🔎 Get user details
      const user = await User.findById(userId);

      // 🔥 Convert tickets to Booking model format
      const formattedTickets = chatbotSession.tickets.map((t) => ({
        visitorType: t.visitorType,
        numberOfTickets: t.quantity,
        totalPrice: t.price,
      }));

      const existingBooking = await Booking.findOne({
        paymentIntentId: paymentIntentId,
      });

      if (existingBooking) {
        return res.json({ received: true });
      }

      // ✅ Create booking
      const booking = await Booking.create({
        userId,
        placeId: place._id,
        name: place.name,
        category: place.category,
        address: place.address,
        city: place.city,
        state: place.state,
        pincode: place.pincode,
        visitDate: chatbotSession.visitDate,
        ticketDetails: formattedTickets,
        totalAmount: chatbotSession.totalAmount,
        paymentStatus: "Paid",
        bookingStatus: "Booked",
        refundStatus: "NotInitiated",
        paymentIntentId: paymentIntentId,
      });

      console.log("✅ Booking created:", booking._id);

      // =========================
      // 🔥 Generate Receipt PDF
      // =========================
      try {
        const { fileName, filePath } = await generateReceipt(booking, user);

        booking.receiptFileName = fileName;
        booking.receiptGeneratedAt = new Date();

        // =========================
        // 🔥 Send confirmation email
        // =========================
        if (user?.email) {
          await sendEmail({
            to: user.email,
            subject: "🎟️ Your Booking is Confirmed - OTBSC",
            text: `Hello ${user.name || "User"}, your booking has been confirmed.`,
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>🎉 Booking Confirmed</h2>
                <p>Hello <strong>${user?.name || "User"}</strong>,</p>
                <p>Your booking has been successfully confirmed.</p>

                <h3>Booking Summary</h3>
                <p><strong>Booking Ref:</strong> ${booking.bookingRef}</p>
                <p><strong>Place:</strong> ${booking.name}</p>
                <p><strong>Visit Date:</strong> ${new Date(
                  booking.visitDate
                ).toLocaleDateString()}</p>
                <p><strong>Total Paid:</strong> ₹${booking.totalAmount}</p>

                <p>Your PDF receipt is attached with this email.</p>
                <br />
                <p>Thanks for booking with OTBSC 🚀</p>
              </div>
            `,
            attachments: [
              {
                filename: fileName,
                path: filePath,
              },
            ],
          });

          booking.emailSent = true;
          booking.emailSentAt = new Date();
        }

        await booking.save();
      } catch (receiptOrMailError) {
        console.error(
          "❌ Receipt/Email Error:",
          receiptOrMailError.message
        );
      }

      await ChatbotSession.findByIdAndDelete(chatbotSession._id);
    } catch (error) {
      console.error("❌ Webhook booking error:", error.message);
    }
  }

  res.json({ received: true });
};

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.user._id;

    const session = await ChatbotSession.findOne({
      user: userId,
      isActive: true,
    });

    if (!session || !session.totalAmount) {
      return res.status(400).json({
        message: "No active booking session found",
      });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "OTBSC Ticket Booking",
            },
            unit_amount: session.totalAmount * 100,
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel?session_id={CHECKOUT_SESSION_ID}`,

      metadata: {
        userId: userId.toString(),
      },
    });

    res.json({ url: stripeSession.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Stripe session failed" });
  }
};

export const verifySession = async (req, res) => {
  try {
    const { session_id, type } = req.query;

    if (!session_id) {
      return res.status(400).json({ valid: false });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (!session) {
      return res.json({ valid: false });
    }

    // ✅ Success page check
    if (type === "success") {
      if (session.payment_status === "paid") {
        return res.json({ valid: true });
      }
      return res.json({ valid: false });
    }

    // ✅ Cancel page check
    if (type === "cancel") {
      return res.json({ valid: true });
    }

    return res.json({ valid: false });
  } catch (error) {
    return res.json({ valid: false });
  }
};