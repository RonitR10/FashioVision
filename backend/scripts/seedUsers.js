const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const MONGO_URI = "mongodb+srv://ronit:ronitisgood@fashiovision.bnaqrok.mongodb.net/?retryWrites=true&w=majority&appName=FashioVision";

mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("DB Error:", err));

async function seedUsers() {
  await User.deleteMany();

  const users = [
    {
      name: "Ronit Admin",
      email: "admin@fashiovision.com",
      password: await bcrypt.hash("adminpass", 10),
      role: "admin",
      isApproved: true,
    },
    {
      name: "Priya Designer",
      email: "priya@fashiovision.com",
      password: await bcrypt.hash("designer123", 10),
      role: "designer",
      isApproved: false, // admin needs to approve
    },
    {
      name: "Kunal User",
      email: "kunal@fashiovision.com",
      password: await bcrypt.hash("user123", 10),
      role: "user",
      isApproved: true,
    }
  ];

  await User.insertMany(users);
  console.log("✅ Users Seeded");
  mongoose.disconnect();
}

seedUsers();
