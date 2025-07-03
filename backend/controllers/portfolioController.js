// controllers/portfolioController.js
const Portfolio = require('../models/Portfolio');

exports.updatePortfolio = async (req, res) => {
  try {
    const designerId = req.designerId; // Comes from authenticateDesigner middleware
    const updates = req.body;

    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { designerId },
      { $set: updates },
      { new: true }
    );

    if (!updatedPortfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    res.status(200).json({ success: true, portfolio: updatedPortfolio });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Current Designer Portfolio
exports.getPortfolio = async (req, res) => {
  try {
    // console.log("okay");
    // const designerId = req.designerId; // Comes from authenticateDesigner middleware
    const userId = req.userId;
    const portfolio = await Portfolio.findOne({ userId });

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    res.status(200).json({ success: true, portfolio });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};