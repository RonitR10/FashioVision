const admin = (req, res, next) => {
    // Assuming the user role is attached to req.user from the auth middleware
    if (req.user && req.user.role === "admin") {
      next(); // user is admin, proceed
    } else {
      res.status(403).json({ message: "Access denied. Admins only." });
    }
  };
  
  module.exports = admin;
  