import Stripe from "stripe";
import Booking from "../models/bookingModel.js";
import User from "../models/userModel.js";
import Place from "../models/placeModel.js";
import cloudinary from "../utils/cloudinary.js";
import { validateLocation } from "../utils/validation.js";
import { MAX_IMAGE_COUNT } from "../utils/constants.js";
import { deleteImageFromCloudinary } from "../utils/cloudinaryHelpers.js";
import Event from "../models/eventModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getUsers = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    // total users count
    const total = await User.countDocuments();

    // paginated users
    const users = await User.find({}, "-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });

  } catch (err) {

    console.error("Get users error:", err);

    res.status(500).json({
      success: false,
      message: "Error fetching users"
    });

  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete user
    await user.deleteOne();

    res.status(200).json({
      message: "User deleted successfully",
      userId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting user" });
  }
};

export const getPendingRefundRequests = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    // total pending refunds count
    const total = await Booking.countDocuments({
      refundStatus: "Pending"
    });

    // paginated pending bookings
    const bookings = await Booking.find({
      refundStatus: "Pending"
    })
      .populate("userId", "name email")
      .populate("placeId", "name city state")
      .sort({ cancelledAt: -1 })
      .skip(skip)
      .limit(limit);

    // 🔥 total pending refund amount
    const pendingAmount = await Booking.aggregate([
      { $match: { refundStatus: "Pending" } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$totalAmount" }
        }
      }
    ]);

    res.json({
      bookings,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      pendingAmount: pendingAmount[0]?.totalAmount || 0
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

export const approveRefund = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Prevent double refund
    if (booking.refundStatus === "Refunded") {
      return res.status(400).json({ message: "Already refunded" });
    }

    if (booking.refundStatus !== "Pending") {
      return res.status(400).json({ message: "No pending refund" });
    }

    if (!booking.paymentIntentId) {
      return res.status(400).json({ message: "Payment intent not found" });
    }

    if (booking.paymentStatus !== "Paid") {
      return res.status(400).json({ message: "Invalid payment status" });
    }

    // 🔥 Stripe Refund
    const refund = await stripe.refunds.create({
      payment_intent: booking.paymentIntentId,
      amount: Math.round(booking.totalAmount * 100),
    });

    booking.refundStatus = "Refunded";
    booking.refundedAt = new Date();

    await booking.save();

    console.log("Refund approved:", booking._id);

    res.json({
      success: true,
      message: "Refund successful",
      refundId: refund.id,
    });

  } catch (error) {
    console.error("Refund error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getRefundStats = async (req, res) => {
  try {

    const stats = await Booking.aggregate([
      {
        $match: { refundStatus: "Refunded" }
      },
      {
        $group: {
          _id: null,
          totalRefunded: { $sum: "$totalAmount" },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      totalRefunded: stats[0]?.totalRefunded || 0,
      count: stats[0]?.count || 0
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

export const getRefundHistory = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    // total refunded bookings
    const total = await Booking.countDocuments({
      refundStatus: "Refunded"
    });

    // paginated refunds
    const refunds = await Booking.find({
      refundStatus: "Refunded"
    })
      .populate("userId", "name email")
      .populate("placeId", "name city state")
      .sort({ refundedAt: -1 })
      .skip(skip)
      .limit(limit);

    // 🔥 total refunded amount (ALL records)
    const totalRefunded = await Booking.aggregate([
      { $match: { refundStatus: "Refunded" } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$totalAmount" }
        }
      }
    ]);

    res.json({
      refunds,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      totalRefundedAmount: totalRefunded[0]?.totalAmount || 0
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

export const getBookingStats = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const query = {};

    const total = await Booking.countDocuments(query);

    const bookings = await Booking.find(query)
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalBookings = await Booking.countDocuments();

    const totalRevenueData = await Booking.aggregate([
      {
        $match: {
          paymentStatus: "Paid",
          refundStatus: { $ne: "Refunded" }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" }
        }
      }
    ]);

    const totalRevenue = totalRevenueData[0]?.totalRevenue || 0;

    res.json({
      bookings,
      total,
      totalBookings,
      totalRevenue
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addPlace = async (req, res) => {
  const uploadedPublicIds = [];

  try {
    const {
      name,
      description,
      category,
      address,
      city,
      state,
      pincode,
      contactEmail,
      contactPhone,
      openingTime,
      closingTime,
      photoUrls,
      pricing
    } = req.body;

    const existingPlace = await Place.findOne({
      name,
      city,
      state
    });

    if (existingPlace) {
      return res.status(400).json({
        success: false,
        message: "Place already exists"
      });
    }

    // ✅ location validation
    const locCheck = await validateLocation(state, city, pincode);
    if (!locCheck.success) {
      return res.status(400).json(locCheck);
    }

    // ✅ TIME VALIDATION
    if (!openingTime || !/^\d{2}:\d{2}$/.test(openingTime)) {
      return res.status(400).json({
        success: false,
        message: "Opening time must be in HH:MM format"
      });
    }

    if (!closingTime || !/^\d{2}:\d{2}$/.test(closingTime)) {
      return res.status(400).json({
        success: false,
        message: "Closing time must be in HH:MM format"
      });
    }

    // ✅ logical check
    if (openingTime >= closingTime) {
      return res.status(400).json({
        success: false,
        message: "Closing time must be after opening time"
      });
    }

    const uploadedUrls = [];

    // ✅ CLOUDINARY UPLOAD
    if (photoUrls && photoUrls.length > 0) {
      for (let i = 0; i < photoUrls.length; i++) {
        const uploadRes = await cloudinary.uploader.upload(photoUrls[i], {
          folder: "places",
          unique_filename: true,
          overwrite: false,
          transformation: [
            { width: 1000, height: 750, crop: "fill", gravity: "auto" },
            { quality: "auto" },
            { fetch_format: "auto" }
          ]
        });

        uploadedUrls.push(uploadRes.secure_url);
        uploadedPublicIds.push(uploadRes.public_id); // ✅ rollback ke liye save
      }
    }

    // ✅ CREATE PLACE
    const newPlace = await Place.create({
      name,
      description,
      category,
      address,
      city,
      state,
      pincode,
      contactEmail,
      contactPhone,
      openingTime,
      closingTime,
      photoUrls: uploadedUrls.length ? uploadedUrls : [],
      pricing
    });

    res.status(201).json({
      success: true,
      message: "Place added successfully",
      data: newPlace
    });

  } catch (err) {
    console.error("Add Place Error:", err);

    if (uploadedPublicIds.length > 0) {
      try {
        for (const publicId of uploadedPublicIds) {
          await cloudinary.uploader.destroy(publicId);
        }
        console.log("🗑️ Uploaded Cloudinary images rolled back successfully");
      } catch (deleteErr) {
        console.error("Cloudinary rollback failed:", deleteErr);
      }
    }

    res.status(500).json({
      success: false,
      message: "Server error while adding place"
    });
  }
};

export const getPlacesAdmin = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const search = req.query.search || "";
    const category = req.query.category || "";

    let query = {};

    // SEARCH BY NAME
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // FILTER BY CATEGORY
    if (category) {
      query.category = category;
    }

    const totalPlaces = await Place.countDocuments(query);

    const places = await Place.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: places,
      pagination: {
        totalPlaces,
        currentPage: page,
        totalPages: Math.ceil(totalPlaces / limit),
      },
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching places",
    });
  }
};

export const getPlaceAdmin = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ success: false, message: "Place not found" });
    res.status(200).json({ success: true, data: place });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error while fetching place" });
  }
};

export const updatePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const place = await Place.findById(id);
    if (!place) {
      return res.status(404).json({
        success: false,
        message: "Place not found"
      });
    }

    const {
      state,
      city,
      pincode,
      openingTime,
      closingTime,
      photoUrls
    } = updates;

    // ✅ LOCATION VALIDATION
    if (state || city || pincode) {
      if (!state || !city || !pincode) {
        return res.status(400).json({
          success: false,
          message: "To update location, provide state, city & pincode"
        });
      }

      const locCheck = await validateLocation(state, city, pincode);
      if (!locCheck.success) return res.status(400).json(locCheck);
    }

    // ✅ TIME VALIDATION (same as add)
    if (openingTime && !/^\d{2}:\d{2}$/.test(openingTime)) {
      return res.status(400).json({
        success: false,
        message: "Opening time must be HH:MM"
      });
    }

    if (closingTime && !/^\d{2}:\d{2}$/.test(closingTime)) {
      return res.status(400).json({
        success: false,
        message: "Closing time must be HH:MM"
      });
    }

    if (openingTime && closingTime && openingTime >= closingTime) {
      return res.status(400).json({
        success: false,
        message: "Closing time must be after opening time"
      });
    }

    let finalUrls = place.photoUrls;

    // ✅ IMAGE UPDATE (SAFE 🔥)
    if (photoUrls && photoUrls.length > 0) {

      if (photoUrls.length > MAX_IMAGE_COUNT) {
        return res.status(400).json({
          success: false,
          message: `Maximum ${MAX_IMAGE_COUNT} images allowed`
        });
      }

      const uploadedUrls = [];

      for (let i = 0; i < photoUrls.length; i++) {

        const uploadRes = await cloudinary.uploader.upload(photoUrls[i], {
          folder: "places",
          unique_filename: true,
          overwrite: false,
          transformation: [
            { width: 1000, height: 750, crop: "fill", gravity: "auto" },
            { quality: "auto" },
            { fetch_format: "auto" }
          ]
        });

        uploadedUrls.push(uploadRes.secure_url);
      }

      // delete old images first
      for (const oldUrl of place.photoUrls) {
        await deleteImageFromCloudinary(oldUrl);
      }

      // then replace with new
      finalUrls = uploadedUrls;
    }

    // ✅ UPDATE DB
    const updatedPlace = await Place.findByIdAndUpdate(
      id,
      {
        ...updates,
        photoUrls: finalUrls
      },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: "Place updated successfully",
      data: updatedPlace
    });

  } catch (err) {
    console.error("UPDATE PLACE ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Server error while updating place"
    });
  }
};

export const deletePlace = async (req, res) => {
  try {
    const { id } = req.params;

    const place = await Place.findById(id);
    if (!place) {
      return res.status(404).json({
        success: false,
        message: "Place not found"
      });
    }

    if (place.photoUrls && place.photoUrls.length > 0) {
      await Promise.allSettled(
        place.photoUrls.map((url) => deleteImageFromCloudinary(url))
      );
    }

    const events = await Event.find({ place: id });

    for (const event of events) {
      if (event.bannerImage) {
        await deleteImageFromCloudinary(event.bannerImage);
      }
    }

    await Event.deleteMany({ place: id });

    await Place.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Place and its events deleted successfully"
    });

  } catch (err) {
    console.error("DELETE PLACE ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Server error while deleting place"
    });
  }
};