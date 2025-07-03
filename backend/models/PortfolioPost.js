const mongoose = require("mongoose");

const portfolioPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
  images: [
    {
      url: { type: String, required: true },
      alt: { type: String },
    },
  ],
  tags: [String],
  designer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  designerId: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  visibility: {
    type: String,
    enum: ["public", "private"],
    default: "public",
  },
  likes: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      likedAt: { type: Date, default: Date.now },
    },
  ],
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: { type: String, required: true },
      commentedAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("PortfolioPost", portfolioPostSchema);
