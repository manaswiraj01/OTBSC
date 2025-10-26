import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Place name is required"],
    minlength: [3, "Place name must be at least 3 characters"],
    maxlength: [100, "Place name cannot exceed 100 characters"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [20, "Description must be at least 20 characters long"],
    maxlength: [1000, "Description cannot exceed 1000 characters"],
  },
  category: {
    type: String,
    enum: {
      values: ["Museum", "Wildlife", "Monument", "Planetarium"],
      message: "Category must be one of: Museum, Wildlife, Monument, Planetarium",
    },
    required: [true, "Category is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    minlength: [10, "Address must be at least 10 characters"],
    maxlength: [200, "Address cannot exceed 200 characters"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
    minlength: [2, "City name must be at least 2 characters"],
    maxlength: [100, "City name cannot exceed 100 characters"],
  },
  state: {
    type: String,
    required: [true, "State is required"],
    minlength: [2, "State name must be at least 2 characters"],
    maxlength: [100, "State name cannot exceed 100 characters"],
  },
  pincode: {
    type: String,
    required: [true, "Pincode is required"],
    validate: {
      validator: function (v) {
        return /^[1-9][0-9]{5}$/.test(v);
      },
      message: "Invalid Indian PIN code format",
    },
  },
  contactEmail: {
    type: String,
    required: [true, "Contact email is required"],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  contactPhone: {
    type: String,
    required: [true, "Contact phone number is required"],
    match: [/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"],
  },
  openingTime: {
    type: String,
    required: [true, "Opening time is required"],
    match: [/^\d{2}:\d{2}$/, "Opening time must be in HH:MM format"],
  },
  closingTime: {
    type: String,
    required: [true, "Closing time is required"],
    match: [/^\d{2}:\d{2}$/, "Closing time must be in HH:MM format"],
  },
  photoUrls: [
    {
      type: String,
      validate: {
        validator: function (value) {
          return /^https?:\/\/.*\.(jpeg|jpg|gif|png|webp|svg|bmp)$/i.test(value);
        },
        message: "Each photo must be a valid image URL",
      },
    }
  ],
  pricing: {
    indianAdult: {
      type: Number,
      required: [true, "Indian Adult price is required"],
      min: [0, "Price must be at least 0"],
      max: [10000, "Price cannot exceed ₹10,000"],
    },
    indianStudent: {
      type: Number,
      required: [true, "Indian Student price is required"],
      min: [0, "Price must be at least 0"],
      max: [10000, "Price cannot exceed ₹10,000"],
    },
    foreignerAdult: {
      type: Number,
      required: [true, "Foreigner Adult price is required"],
      min: [0, "Price must be at least 0"],
      max: [50000, "Price cannot exceed ₹50,000"],
    },
    foreignerStudent: {
      type: Number,
      required: [true, "Foreigner Student price is required"],
      min: [0, "Price must be at least 0"],
      max: [50000, "Price cannot exceed ₹50,000"],
    },
  },
}, { timestamps: true });

const Place = mongoose.model("Place", placeSchema);
export default Place;
