import cloudinary from "./cloudinary.js";

export const formatName = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");

export const getPublicIdFromUrl = (url) => {
  try {
    const parts = url.split("/");

    const uploadIndex = parts.findIndex((part) => part === "upload");
    if (uploadIndex === -1) return null;

    let publicPathParts = parts.slice(uploadIndex + 1);

    // remove version like v1234567890
    if (publicPathParts[0]?.startsWith("v")) {
      publicPathParts.shift();
    }

    const fullPath = publicPathParts.join("/");
    const publicId = fullPath.substring(0, fullPath.lastIndexOf("."));

    return publicId;
  } catch (err) {
    console.error("Error extracting public_id:", err.message);
    return null;
  }
};

export const deleteImageFromCloudinary = async (url) => {
  try {
    const public_id = getPublicIdFromUrl(url);

    if (!public_id) {
      console.error("Invalid Cloudinary URL, public_id not found");
      return;
    }

    const result = await cloudinary.uploader.destroy(public_id);
    console.log("Cloudinary delete result:", result);
  } catch (err) {
    console.error("Cloudinary delete error:", err.message);
  }
};