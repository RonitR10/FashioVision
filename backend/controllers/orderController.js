// controllers/orderController.js
const Order = require('../models/Order');
const Product = require('../models/Product');

exports.placeOrder = async (req, res) => {
  try {
    const { cartItems } = req.body;

    // assuming each item includes productId, quantity, price
    const orders = await Promise.all(cartItems.map(async (item) => {
      const product = await Product.findById(item.productId);
      return Order.create({
        products: [item],
        user: req.user._id,
        designer: product.designer, // assuming product has designer ref
        totalAmount: item.price * item.quantity
      });
    }));

    res.status(201).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDesignerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ designer: req.user._id }).populate('products.productId user');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    // check if current user is the designer of the order
    if (order.designer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    order.status = status;
    await order.save();

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// controllers/orderController.js
exports.cancelOrder = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { cancelReason } = req.body;
  
      const order = await Order.findById(orderId);
  
      if (!order) return res.status(404).json({ error: 'Order not found' });
  
      const now = new Date();
      const orderTime = new Date(order.createdAt);
      const timeDiffInHours = (now - orderTime) / (1000 * 60 * 60);
  
      // ✅ Only allow cancellation within 2 hours
      if (timeDiffInHours > 2) {
        return res.status(400).json({ error: 'Cancellation period has expired' });
      }
  
      // ✅ Role-based access
      const userId = req.user._id.toString();
      const role = req.user.role;
  
      const isUser = role === 'user' && order.user.toString() === userId;
      const isDesigner = role === 'designer' && order.designer.toString() === userId;
  
      if (!isUser && !isDesigner) {
        return res.status(403).json({ error: 'Not authorized to cancel this order' });
      }
  
      if (!['Pending', 'Accepted'].includes(order.orderStatus)) {
        return res.status(400).json({ error: 'Order cannot be cancelled at this stage' });
      }
  
      order.orderStatus = 'Cancelled';
      order.cancelledBy = isUser ? 'User' : 'Designer';
      order.cancelReason = cancelReason || '';
      order.cancelledAt = now;
  
      await order.save();
  
      res.json({ success: true, message: 'Order cancelled successfully', order });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  