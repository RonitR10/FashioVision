require('dotenv').config();
const cloudinary = require('cloudinary').v2;

console.log("Cloud Name:", process.env.CLOUD_NAME);
console.log("API Key:", process.env.CLOUD_API_KEY);
console.log("API Secret:", process.env.CLOUD_API_SECRET);


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

async function checkCloudinaryConnection() {
  try {
    const result = await cloudinary.api.ping();
    console.log("✅ Cloudinary is set up correctly!");
    console.log(result);
  } catch (error) {
    console.error("❌ Failed to connect to Cloudinary.");
    console.error(error.message);
  }
}

checkCloudinaryConnection();
