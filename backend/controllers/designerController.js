const User = require("../models/User");

exports.getUserIdByDesignerId = async (req, res) => {
  try {
    const user = await User.findOne({
      designerId: req.params.designerId,
      role: "designer",
    });

    if (!user) {
      return res.status(404).json({ message: "Designer not found" });
    }

    res.json({ userId: user._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
