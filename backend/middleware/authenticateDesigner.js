const jwt = require("jsonwebtoken");

const authenticateDesigner = (req, res, next) => {
  const token = req.header("authToken");
  // console.log(token);

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    // Ensure the role is 'designer'
    if (decoded.role !== "designer") {
      return res.status(403).json({ message: "Access denied. Not a designer." });
    }

    // console.log("Decoded Token:", decoded);
    req.designerId = decoded.designerId;  // Attach designerId
    req.userId = decoded.userId; 
    
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    console.error("Token verification error:", err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authenticateDesigner;
