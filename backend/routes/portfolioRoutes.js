// routes/portfolioRoute.js
const express = require('express');
const { getPortfolio, updatePortfolio } = require('../controllers/portfolioController');
const { authenticateDesigner } = require('../middleware/authenticateDesigner');

const router = express.Router();

// Get current designer's portfolio
router.get('/me', authenticateDesigner, getPortfolio);

// Update current designer's portfolio
router.put('/me', authenticateDesigner, updatePortfolio);

module.exports = router;
