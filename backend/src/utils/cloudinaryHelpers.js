import cloudinary from "./cloudinary.js";

export const formatName = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");

export const getPublicIdFromUrl = (url) => {
  const parts = url.split("/");
  const filename = parts[parts.length - 1];
  return `places/${filename.split(".")[0]}`;
};

export const deleteImageFromCloudinary = async (url) => {
  try {
    const public_id = getPublicIdFromUrl(url);
    await cloudinary.uploader.destroy(public_id);
  } catch (err) {
    console.error("Cloudinary delete error:", err.message);
  }
};
