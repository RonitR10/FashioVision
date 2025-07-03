const express = require('express');
const router = express.Router();
const { getCart, updateCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/getcart', authMiddleware, getCart);
router.post('/updatecart', authMiddleware, updateCart);

module.exports = router;
