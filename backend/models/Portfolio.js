const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  designerId: { type: Number, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // Basic Info
  profilePic: { type: String, default: '' }, // URL to image
  title: { type: String, default: '' },
  brandName: { type: String, default: '' },
  bio: { type: String, default: '' },

  // Background
  experience: { type: String, default: '' },
  speciality: { type: String, default: '' },
  location: { type: String, default: '' },

  // Contact (optional)
  contactEmail: { type: String, default: '' },

  // Social Links
  socialLinks: {
    instagram: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' }
  },

  // Tags for discovery
  tags: [{ type: String }],

  // Availability status
  availability: {
    type: String,
    enum: ['available', 'unavailable', 'on project'],
    default: 'available'
  },

  // Ratings (optional/future)
  averageRating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 }

}, { timestamps: true }); // Auto-manages createdAt and updatedAt

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
module.exports = Portfolio;
