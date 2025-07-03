const cloudinary = require("cloudinary").v2;

const uploadImageHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload to Cloudinary using the buffer from memory storage
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload failed:", error);
          return res.status(500).json({ error: "Image upload failed" });
        }
        res.status(200).json({ imageUrl: result.secure_url });
      }
    );

    // Pipe the file buffer to Cloudinary
    req.pipe(result);
    
  } catch (err) {
    console.error("Image Upload Error:", err);
    res.status(500).json({ error: "Image upload failed" });
  }
};

module.exports = { uploadImageHandler };
