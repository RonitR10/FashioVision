const mongoose = require('mongoose');

// const MONGO_URI = process.env.MONGO_URI; // or your direct URI string

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // optional: stop app if DB fails
  }
}

module.exports = connectDB;
