const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Portfolio = require("../models/Portfolio"); // Added to fetch portfolio after login

// Signup logic
const signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await User.create({ name, email, password: hashedPassword, role });

    // If the role is designer, create a DesignerRequest entry
    if (role === "designer") {
      const DesignerRequest = require("../models/Designer"); // adjust the path if needed

      await DesignerRequest.create({
        userId: user._id,
        name: user.name,
        email: user.email,
        requestStatus: "pending"
      });
    }

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};


// Login logic
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Allow only approved designers to log in
    if (user.role === 'designer' && !user.isApproved) {
      return res.status(403).json({ message: "Your designer request is still pending approval." });
    }

    // Generate JWT Token with designerId and role
    const token = jwt.sign(
      { designerId: user.designerId, userId: user._id, role: user.role }, // Include designerId and role in the payload
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // If the user is a designer, fetch their portfolio
    let portfolio = null;
    if (user.role === 'designer') {
      portfolio = await Portfolio.findOne({ designer: user._id });
    }

    // Send the response with token, user data, and portfolio if applicable
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isApproved: user.isApproved,
        designerId: user.designerId,  // Send designerId from user._id
        portfolio: portfolio,   // Include the portfolio data here
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

module.exports = { signup, login };
