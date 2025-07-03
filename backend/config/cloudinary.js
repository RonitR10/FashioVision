const { v2: cloudinary } = require("cloudinary");

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
  });
  console.log("Cloudinary connected");
};

// Using module.exports to export the function
module.exports = { cloudinary, connectCloudinary };
