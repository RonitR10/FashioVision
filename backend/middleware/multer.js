const multer = require("multer");

// File filter (optional – restrict to images only)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Multer configuration for in-memory storage
const storage = multer.memoryStorage();

// Initialize multer with in-memory storage and file filter
const upload = multer({ storage, fileFilter });

module.exports = upload;
