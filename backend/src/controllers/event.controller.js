import Event from "../models/eventModel.js";
import Place from "../models/placeModel.js";
import cloudinary from "../utils/cloudinary.js";
import { deleteImageFromCloudinary } from "../utils/cloudinaryHelpers.js";
import { sendEventNotificationEmails } from "../utils/sendEventEmail.js";

// CREATE EVENT
export const createEvent = async (req, res) => {
    let uploadedPublicId = null;

    try {
        const {
            title,
            description,
            place,
            eventDate,
            startTime,
            bannerImage,
        } = req.body;

        if (!title || !description || !place || !eventDate || !startTime || !bannerImage) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided",
            });
        }

        const existingPlace = await Place.findById(place);
        if (!existingPlace) {
            return res.status(404).json({
                success: false,
                message: "Place not found",
            });
        }

        // ✅ duplicate event check
        const existingEvent = await Event.findOne({
            title: title.trim(),
            place,
            eventDate: new Date(eventDate),
        });

        if (existingEvent) {
            return res.status(400).json({
                success: false,
                message: "An event with same title, place and date already exists",
            });
        }

        // ✅ time validation (event startTime must be before place closingTime)
        if (startTime >= existingPlace.closingTime) {
            return res.status(400).json({
                success: false,
                message: `Event start time must be before place closing time (${existingPlace.closingTime})`,
            });
        }

        // ✅ upload single banner image to cloudinary
        const uploadRes = await cloudinary.uploader.upload(bannerImage, {
            folder: "events",
            unique_filename: true,
            overwrite: false,
            transformation: [
                { width: 1200, height: 700, crop: "fill", gravity: "auto" },
                { quality: "auto" },
                { fetch_format: "auto" }
            ]
        });

        uploadedPublicId = uploadRes.public_id;

        const event = await Event.create({
            title,
            description,
            place,
            eventDate,
            startTime,
            bannerImage: uploadRes.secure_url,
        });
        await sendEventNotificationEmails(event);

        const populatedEvent = await Event.findById(event._id).populate("place");

        return res.status(201).json({
            success: true,
            message: "Event created successfully",
            data: populatedEvent,
        });

    } catch (err) {
        console.error("CREATE EVENT ERROR:", err);

        // rollback uploaded image if db create fails
        if (uploadedPublicId) {
            try {
                await cloudinary.uploader.destroy(uploadedPublicId);
            } catch (deleteErr) {
                console.error("Cloudinary rollback failed:", deleteErr);
            }
        }

        return res.status(500).json({
            success: false,
            message: "Server error while creating event",
        });
    }
};

// UPDATE EVENT
export const updateEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const updates = req.body;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found",
            });
        }

        let targetPlace = null;

        // ✅ place validation if place changed
        if (updates.place) {
            targetPlace = await Place.findById(updates.place);
            if (!targetPlace) {
                return res.status(404).json({
                    success: false,
                    message: "Selected place not found",
                });
            }
        } else {
            targetPlace = await Place.findById(event.place);
        }

        // ✅ final values after update
        const finalTitle = updates.title ? updates.title.trim() : event.title;
        const finalPlace = updates.place || event.place;
        const finalEventDate = updates.eventDate || event.eventDate;
        const finalStartTime = updates.startTime || event.startTime;

        // ✅ duplicate event check (exclude current event)
        const duplicateEvent = await Event.findOne({
            _id: { $ne: eventId },
            title: finalTitle,
            place: finalPlace,
            eventDate: new Date(finalEventDate),
        });

        if (duplicateEvent) {
            return res.status(400).json({
                success: false,
                message: "Another event with same title, place and date already exists",
            });
        }

        // ✅ time validation
        if (finalStartTime >= targetPlace.closingTime) {
            return res.status(400).json({
                success: false,
                message: `Event start time must be before place closing time (${targetPlace.closingTime})`,
            });
        }

        let finalBannerImage = event.bannerImage;

        // ✅ if new banner image is sent
        if (updates.bannerImage) {
            const uploadRes = await cloudinary.uploader.upload(updates.bannerImage, {
                folder: "events",
                unique_filename: true,
                overwrite: false,
                transformation: [
                    { width: 1200, height: 700, crop: "fill", gravity: "auto" },
                    { quality: "auto" },
                    { fetch_format: "auto" },
                ],
            });

            finalBannerImage = uploadRes.secure_url;

            // old image delete after successful upload
            if (event.bannerImage) {
                await deleteImageFromCloudinary(event.bannerImage);
            }
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            {
                ...updates,
                title: finalTitle,
                place: finalPlace,
                eventDate: finalEventDate,
                startTime: finalStartTime,
                bannerImage: finalBannerImage,
            },
            {
                new: true,
                runValidators: true,
            }
        ).populate("place");

        return res.status(200).json({
            success: true,
            message: "Event updated successfully",
            data: updatedEvent,
        });

    } catch (err) {
        console.error("UPDATE EVENT ERROR:", err);

        return res.status(500).json({
            success: false,
            message: "Server error while updating event",
        });
    }
};

// DELETE EVENT
export const deleteEvent = async (req, res) => {
    try {
        const { eventId } = req.params;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found",
            });
        }

        // ✅ delete banner image from cloudinary
        if (event.bannerImage) {
            await deleteImageFromCloudinary(event.bannerImage);
        }

        await Event.findByIdAndDelete(eventId);

        return res.status(200).json({
            success: true,
            message: "Event deleted successfully",
        });

    } catch (err) {
        console.error("DELETE EVENT ERROR:", err);

        return res.status(500).json({
            success: false,
            message: "Server error while deleting event",
        });
    }
};

// GET ALL EVENTS
export const getAllEvents = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 15;
        const search = req.query.search || "";
        const place = req.query.place || "";

        let query = {};

        // SEARCH BY TITLE
        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        // FILTER BY PLACE
        if (place) {
            query.place = place;
        }

        const totalEvents = await Event.countDocuments(query);

        const events = await Event.find(query)
            .populate("place", "name city state")
            .select("title bannerImage eventDate startTime place")
            .sort({ eventDate: 1, createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        return res.status(200).json({
            success: true,
            data: events,
            pagination: {
                totalEvents,
                currentPage: page,
                totalPages: Math.ceil(totalEvents / limit),
            },
        });

    } catch (err) {
        console.error("GET ALL EVENTS ERROR:", err);

        return res.status(500).json({
            success: false,
            message: "Server error while fetching events",
        });
    }
};

// GET SINGLE EVENT
export const getEventById = async (req, res) => {
    try {
        const { eventId } = req.params;

        const event = await Event.findById(eventId)
            .populate("place", "name city state address");

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: event,
        });

    } catch (err) {
        console.error("GET EVENT ERROR:", err);

        return res.status(500).json({
            success: false,
            message: "Server error while fetching event",
        });
    }
};
