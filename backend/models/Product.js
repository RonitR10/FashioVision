const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  designer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
  brand: { 
    type: String, 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  salePrice: { 
    type: Number, 
    default: null 
  },
  isOnSale: {
    type: Boolean,
    default: false
  },
  sizes: { 
    type: [String], 
    required: true, 
    enum: ["S", "M", "L", "XL", "XXL"], 
  },
  color: { 
    type: [String], 
    required: true 
  },
  material: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true, 
    enum: [
      "Men's Wear",
      "Women's Wear",
      "Kid's Wear",
      "Unisex",
      "Ethnic Wear",
      "Casual Wear",
      "Formal Wear",
      "Accessories",
      "Footwear",
      "Bags",
      "Shoes"
    ]
  },
  collection: { 
    type: String, 
    required: true 
  },
  images: { 
    type: [String], 
    required: true 
  },
  stock: { 
    type: Number, 
    default: 0, 
    required: true 
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  reviews: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  tags: {
    type: [String],
    default: [],
  },
  status: {
    type: String,
    enum: ["active", "inactive", "deleted"],
    default: "active",
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
