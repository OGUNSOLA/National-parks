/** @format */

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CloudName,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "National Parks",
    allowedFormats: ["jpeg", "png", "jpg", "HEIF"],
  },
});

module.exports = {
  cloudinary,
  storage,
};
