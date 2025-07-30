import express from 'express'
import { adminAuth } from '../middlewares/adminAuth.js';
import { validateEditProfileData } from '../utils/validation.js';
import cloudinary from '../utils/cloudinary.js';

const adminProfileRouter = express.Router();

adminProfileRouter.get("/profile/view", adminAuth, async (req, res) => {
  try {
    const admin = req.admin;
    res.send(admin);
  } catch (err) {
    res.status(400).send("Cannot get admin profile");
  }
})

adminProfileRouter.patch("/profile/edit", adminAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.admin;

    if (req.body.photoUrl) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(req.body.photoUrl, {
          transformation: [
            { width: 500, height: 500, crop: "fill", gravity: "auto" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
          folder: "admin/profile_pictures",
          public_id: `admin_${loggedInUser._id}`,
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
      message: " admin profile updated successfuly",
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

export default adminProfileRouter;
