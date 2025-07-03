// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  designer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      name: String, // snapshot of product name at time of order
      size: String,
      color: String,
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }, // snapshot of price at time of order
    }
  ],

  shippingInfo: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: String,
    country: String,
    postalCode: { type: String, required: true },
    phone: { type: String, required: true }
  },

  paymentInfo: {
    method: { type: String, enum: ['COD', 'Card', 'UPI'], default: 'COD' },
    paymentId: String,
    paymentStatus: String
  },

  orderStatus: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },

  isPaid: { type: Boolean, default: false },
  paidAt: Date,

  deliveredAt: Date,

  totalAmount: {
    type: Number,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  cancelledBy: {
    type: String,
    enum: ['User', 'Designer'],
    default: null
  },
  cancelReason: {
    type: String,
    default: ''
  },
  cancelledAt: Date,
});

module.exports = mongoose.model('Order', orderSchema);
