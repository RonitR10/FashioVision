const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    // console.log(token);
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    const user = await User.findById(decoded.userId); // or decoded._id based on your payload

    if (!user) return res.status(404).json({ message: 'User not found.' });

    req.user = user;
    next();
  } catch (err) {
    console.error('Auth error:', err);
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
