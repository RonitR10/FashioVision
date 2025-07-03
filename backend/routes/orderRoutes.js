const express = require('express');
const {
  placeOrder,
  getDesignerOrders,
  updateOrderStatus,
  cancelOrder
} = require('../controllers/orderController');
const { authenticateToken } = require('../middlewares/authenticateToken');
const router = express.Router();

router.post('/place', authenticateToken, placeOrder);
router.get('/designer', authenticateToken, getDesignerOrders);
router.put('/status/:orderId', authenticateToken, updateOrderStatus);
router.post('/cancel/:orderId', authenticateToken, cancelOrder); // ✅ POST method + updated middleware

module.exports = router;
