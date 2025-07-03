const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["user", "designer", "admin"],
    default: "user",
  },

  isApproved: {
    type: Boolean,
    default: false, // for designer approval
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  designerId: {
    type: Number,
    default: null // or just leave it undefined
  },
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: { type: Number, default: 1 },
    }
  ],
  
});

module.exports = mongoose.model("User", userSchema);
