//server

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const {connectCloudinary} = require("./config/cloudinary");
const connectDB = require("./config/db"); // Make sure you have this file for DB connection
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1905152260.
connectCloudinary();

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/userRoutes");
const designerRoutes = require("./routes/designerRoutes");
const cartRoutes = require('./routes/cartRoutes');
const authMiddleware = require("./middleware/authMiddleware");
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3734009106.
const adminRoutes = require("./routes/admin")
dotenv.config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 5000;  // You can change the port if needed

// Middlewar2

app.use(cors());
// Enable CORS for cross-origin requests
app.use(express.json());  // Parse incoming JSON requests

// Connect to MongoDB
connectDB();

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Define the /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server, This was a difficult task yet we were able to achieve it... Feels wonderful!" });
});

app.use("/api/designer", designerRoutes);
app.use("/api/user", userRoutes);

app.use("/api/auth", authRoutes);

app.use('/api/cart', cartRoutes);
app.use('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route!' });
});


app.use('/api/admin', adminRoutes);
// Add your API routes for designers and portfolios (Example)
// app.use("/api/designers", require("./routes/designerRoutes"));
// app.use("/api/portfolios", require("./routes/portfolioRoutes"));

// Start the server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
