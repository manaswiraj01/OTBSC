import cron from "node-cron";
import Event from "../models/eventModel.js";
import { deleteImageFromCloudinary } from "./cloudinaryHelpers.js";

const startEventCleanupJob = () => {
  cron.schedule("*/5 * * * *", async () => {
    try {
      console.log("🧹 Running event cleanup job...");

      const now = new Date();

      const events = await Event.find().populate("place");

      for (const event of events) {
        if (!event.place) continue;

        const { closingTime } = event.place;
        if (!closingTime) continue;

        const eventDate = new Date(event.eventDate);
        const year = eventDate.getFullYear();
        const month = String(eventDate.getMonth() + 1).padStart(2, "0");
        const day = String(eventDate.getDate()).padStart(2, "0");

        const [hours, minutes] = closingTime.split(":").map(Number);

        const expiryDateTime = new Date(`${year}-${month}-${day}T00:00:00`);
        expiryDateTime.setHours(hours, minutes, 0, 0);

        if (now >= expiryDateTime) {
          console.log(`🗑️ Deleting expired event: ${event.title}`);

          if (event.bannerImage) {
            await deleteImageFromCloudinary(event.bannerImage);
          }

          await Event.findByIdAndDelete(event._id);
        }
      }

      console.log("Event cleanup job completed");
    } catch (err) {
      console.error("Event Cleanup Job Error:", err.message);
    }
  });
};

export default startEventCleanupJob;