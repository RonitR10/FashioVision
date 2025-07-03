const express = require('express');
const router = express.Router();
const DesignerRequest = require('../models/Designer');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/admin');
const User = require('../models/User');
const Portfolio = require('../models/Portfolio');

// Get all designer requests
router.get('/designer-requests', async (req, res) => {
  try {
    const requests = await DesignerRequest.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all pending designer requests
router.get("/pending-designers", auth, admin, async (req, res) => {
  try {
    const pendingDesigners = await User.find({ role: "designer", isApproved: false });
    res.json(pendingDesigners);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch pending designers", error: err.message });
  }
});

// Approve a designer request
router.patch('/approve-designer/:id', auth, admin, async (req, res) => {
  try {
    // Step 1: Approve designer request
    const designerRequest = await DesignerRequest.findByIdAndUpdate(
      req.params.id,
      { requestStatus: 'approved' },
      { new: true }
    );

    if (!designerRequest) {
      return res.status(404).json({ message: "Designer request not found" });
    }

    // Step 2: Assign new designerId
    const lastApprovedDesigner = await User.findOne({ isApproved: true, role: 'designer' })
      .sort({ designerId: -1 })
      .limit(1);

    const newDesignerId = lastApprovedDesigner ? lastApprovedDesigner.designerId + 1 : 1;

    // Step 3: Update user
    const updatedUser = await User.findByIdAndUpdate(
      designerRequest.userId,
      { isApproved: true, designerId: newDesignerId },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 4: Create portfolio
    const newPortfolio = await Portfolio.create({
      designerId: newDesignerId,
      userId: updatedUser._id,
      bio: '',
      socialLinks: {}
    });

    // Optional: If you want to initialize empty posts/products/collections
    // You can skip this if you're creating them later on the dashboard
    // await Post.create({ designerId: newDesignerId, ... });
    // await Product.create({ designerId: newDesignerId, ... });
    // await Collection.create({ designerId: newDesignerId, ... });

    res.json({
      success: true,
      message: "Designer approved and portfolio created",
      designerRequest,
      updatedUser,
      newPortfolio
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});



// Decline a designer request
router.patch('/decline-designer/:id', async (req, res) => {
  try {
    const designerRequest = await DesignerRequest.findByIdAndUpdate(
      req.params.id,
      { requestStatus: 'declined' },
      { new: true }
    );
    res.json({ success: true, designerRequest });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
