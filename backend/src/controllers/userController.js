import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { validateEditProfileData } from '../utils/validation.js';
import cloudinary from '../utils/cloudinary.js';
import PendingUser from "../models/pendingUserModel.js";
import sendOtpEmail from "../utils/sendOtpEmail.js";

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phoneNo,
      countryCode,
      gender,
      dob,
      nationality,
      country,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !phoneNo ||
      !countryCode ||
      !gender ||
      !dob ||
      !nationality ||
      !country
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if already fully registered
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered. Please login.",
      });
    }

    const otp = generateOtp();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min
    const otpLastSentAt = new Date();

    const passwordHash = await bcrypt.hash(password, 10);

    // Same email pe pending record already hai to update kar do
    await PendingUser.findOneAndUpdate(
      { email: normalizedEmail },
      {
        name,
        email: normalizedEmail,
        password: passwordHash,
        phoneNo,
        countryCode,
        gender,
        dob,
        nationality,
        country,
        otp,
        otpExpiresAt,
        otpLastSentAt,
      },
      { upsert: true, new: true, runValidators: true }
    );

    const mailSent = await sendOtpEmail(normalizedEmail, otp);

    if (!mailSent) {
      return res.status(500).json({
        message: "Failed to send OTP email. Please try again.",
      });
    }

    return res.status(200).json({
      message: "OTP sent successfully to your email",
      email: normalizedEmail,
      resendAfterSeconds: 30,
    });
  } catch (err) {
    console.error("Register User Error:", err.message);
    return res.status(500).json({ message: err.message });
  }
};

export const verifySignupOtp = async (req, res) => {
  try {
    const { email, otp, action } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const pendingUser = await PendingUser.findOne({ email: normalizedEmail });

    if (!pendingUser) {
      return res.status(404).json({
        message: "Signup session expired or not found. Please signup again.",
      });
    }

    // =========================
    // RESEND OTP FLOW
    // =========================
    if (action === "resend") {
      const now = new Date();
      const secondsPassed = Math.floor(
        (now - new Date(pendingUser.otpLastSentAt)) / 1000
      );

      if (secondsPassed < 30) {
        return res.status(429).json({
          message: `Please wait ${30 - secondsPassed}s before requesting a new OTP`,
          resendAfterSeconds: 30 - secondsPassed,
        });
      }

      const newOtp = generateOtp();

      pendingUser.otp = newOtp;
      pendingUser.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min
      pendingUser.otpLastSentAt = new Date();

      await pendingUser.save();

      const mailSent = await sendOtpEmail(normalizedEmail, newOtp);

      if (!mailSent) {
        return res.status(500).json({
          message: "Failed to resend OTP. Please try again.",
        });
      }

      return res.status(200).json({
        message: "New OTP sent successfully",
        resendAfterSeconds: 30,
      });
    }

    // =========================
    // VERIFY OTP FLOW
    // =========================
    if (!otp) {
      return res.status(400).json({
        message: "OTP is required for verification",
      });
    }

    if (new Date() > pendingUser.otpExpiresAt) {
      return res.status(400).json({
        message: "OTP expired. Please request a new OTP.",
      });
    }

    if (pendingUser.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // Final safety check
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      await PendingUser.deleteOne({ email: normalizedEmail });
      return res.status(400).json({
        message: "Email already registered. Please login.",
      });
    }

    // Create real verified user
    const user = new User({
      name: pendingUser.name,
      email: pendingUser.email,
      password: pendingUser.password,
      phoneNo: pendingUser.phoneNo,
      countryCode: pendingUser.countryCode,
      gender: pendingUser.gender,
      dob: pendingUser.dob,
      nationality: pendingUser.nationality,
      country: pendingUser.country,
    });

    const savedUser = await user.save();
    const token = await savedUser.getJWT();

    // Delete pending record after success
    await PendingUser.deleteOne({ email: normalizedEmail });

    res.cookie("token", token, {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(201).json({
      message: "Email verified successfully, Account created.",
      data: savedUser,
    });
  } catch (err) {
    console.error("Verify Signup OTP Error:", err.message);
    return res.status(500).json({ message: err.message });
  }
};

export const cancelSignupSession = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    await PendingUser.deleteOne({ email: normalizedEmail });

    return res.status(200).json({
      message: "Pending signup session cleared successfully",
    });
  } catch (err) {
    console.error("Cancel Signup Session Error:", err.message);
    return res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("Invalid Credentials");
        }

        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            const token = await user.getJWT();
            res.cookie('token', token, {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            })
                .json({ message: "Login successfully", user });
        }
        else {
            throw new Error("Invalid Credentials");
        }

    } catch (err) {
        res.status(404).send(err.message);
    }
};

export const logoutUser = (req, res) => {
    try {
        res.cookie('token', '', {
            expires: new Date(Date.now()),
        }).send("User logout successfully");
    }
    catch (err) {
        res.status(404).send(err.message);
    }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Cannot get user profile");
  }
}

export const editUserProfile = async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;

    if (req.body.photoUrl) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(req.body.photoUrl, {
          transformation: [
            { width: 500, height: 500, crop: "fill", gravity: "auto" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
          folder: "profile_pictures",
          public_id: `user_${loggedInUser._id}`,
          overwrite: true,
        });
        loggedInUser.photoUrl = uploadResponse.secure_url;
      } catch (uploadErr) {
        console.error("Cloudinary upload failed:", uploadErr.message);
        throw new Error("Image upload failed");
      }
    }
    
    Object.keys(req.body).forEach((key) => {
      if (key !== 'photoUrl') {
        loggedInUser[key] = req.body[key];
      }
    });
    await loggedInUser.save();

    res.json({
      message: "profile updated successfuly",
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};