import Stripe from "stripe";
import Booking from "../models/bookingModel.js";
import User from "../models/userModel.js";
import Place from "../models/placeModel.js";
import cloudinary from "../utils/cloudinary.js";
import { validateLocation } from "../utils/validation.js";
import { MAX_IMAGE_COUNT } from "../utils/constants.js";
import { formatName, deleteImageFromCloudinary } from "../utils/cloudinaryHelpers.js";

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
      { $match: { bookingStatus: "Completed" } },
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

    const locCheck = await validateLocation(state, city, pincode);
    if (!locCheck.success) {
      return res.status(400).json(locCheck);
    }

    // time validation
    if (!openingTime?.hour || !openingTime?.minute) {
      return res.status(400).json({
        success: false,
        message: "Opening time incomplete"
      });
    }

    if (!closingTime?.hour || !closingTime?.minute) {
      return res.status(400).json({
        success: false,
        message: "Closing time incomplete"
      });
    }

    // convert to 24 hour format
    const convertTo24Hour = (time) => {
      let hour = parseInt(time.hour);

      if (time.period === "PM" && hour !== 12) hour += 12;
      if (time.period === "AM" && hour === 12) hour = 0;

      const hourStr = hour.toString().padStart(2, "0");
      const minStr = time.minute.padStart(2, "0");

      return `${hourStr}:${minStr}`;
    };

    const openingTimeString = convertTo24Hour(openingTime);
    const closingTimeString = convertTo24Hour(closingTime);

    // logical check
    if (openingTimeString >= closingTimeString) {
      return res.status(400).json({
        success: false,
        message: "Closing time must be after opening time"
      });
    }

    const placeName = formatName(name);
    const uploadedUrls = [];

    // upload images to cloudinary
    if (photoUrls && photoUrls.length > 0) {
      for (let i = 0; i < photoUrls.length; i++) {
        const public_id = `places/${placeName}_${i + 1}`;

        const uploadRes = await cloudinary.uploader.upload(photoUrls[i], {
          public_id,
          transformation: [
            { width: 1000, height: 750, crop: "fill", gravity: "auto" },
            { quality: "auto" },
            { fetch_format: "auto" }
          ]
        });

        uploadedUrls.push(uploadRes.secure_url);
      }
    }

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
      openingTime: openingTimeString,
      closingTime: closingTimeString,
      photoUrls: uploadedUrls,
      pricing
    });

    res.status(201).json({
      success: true,
      message: "Place added successfully",
      data: newPlace
    });

  } catch (err) {
    console.error(err);

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
    if (!place) return res.status(404).json({ success: false, message: "Place not found" });

    const { state, city, pincode, name, photoUrls } = updates;

    if (state || city || pincode) {
      if (!state || !city || !pincode)
        return res.status(400).json({ success: false, message: "To update location, all of 'state', 'city', and 'pincode' must be provided." });
      const locCheck = await validateLocation(state, city, pincode);
      if (!locCheck.success) return res.status(400).json(locCheck);
    }

    let finalUrls = place.photoUrls;

    if (photoUrls && photoUrls.length > 0) {
      if (photoUrls.length > MAX_IMAGE_COUNT)
        return res.status(400).json({ success: false, message: `Maximum ${MAX_IMAGE_COUNT} images allowed.` });

      for (const oldUrl of place.photoUrls) {
        await deleteImageFromCloudinary(oldUrl);
      }

      const newName = formatName(name || place.name);
      finalUrls = [];
      for (let i = 0; i < photoUrls.length; i++) {
        const public_id = `places/${newName}_${i + 1}`;
        const uploadRes = await cloudinary.uploader.upload(photoUrls[i], {
          public_id,
          transformation: [
            { width: 1000, height: 750, crop: "fill", gravity: "auto" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        });
        finalUrls.push(uploadRes.secure_url);
      }
    }

    if (!photoUrls && name && name !== place.name) {
      const oldName = formatName(place.name);
      const newName = formatName(name);

      const renamedUrls = [];
      for (let i = 0; i < place.photoUrls.length; i++) {
        const oldPublicId = `places/${oldName}_${i + 1}`;
        const newPublicId = `places/${newName}_${i + 1}`;
        const renamed = await cloudinary.uploader.rename(oldPublicId, newPublicId);
        renamedUrls.push(renamed.secure_url);
      }
      finalUrls = renamedUrls;
    }

    const updatedPlace = await Place.findByIdAndUpdate(id, { ...updates, photoUrls: finalUrls }, { new: true, runValidators: true });

    res.status(200).json({ success: true, message: "Place updated successfully", data: updatedPlace });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error while updating place" });
  }
};

export const deletePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await Place.findById(id);
    if (!place) return res.status(404).json({ success: false, message: "Place not found" });

    await Promise.all(
      place.photoUrls.map((url) => deleteImageFromCloudinary(url))
    );

    await Place.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Place deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error while deleting place" });
  }
};