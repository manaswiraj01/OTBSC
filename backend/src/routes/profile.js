import express from 'express'


const profileRouter = express.Router();



profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
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
});

export default profileRouter
