const User = require('../models/User');

// GET /api/cart
exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.productId');
    res.json({ cart: user.cart });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching cart' });
  }
};

// POST /api/cart/updatecart
exports.updateCart = async (req, res) => {
  try {
    // console.log(req.body);
    const { cart } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { cart }, { new: true });
    res.json({ success: true, cart: user.cart });
  } catch (err) {
    console.error('Cart update error:', err); // helpful for debug
    res.status(500).json({ error: 'Failed to update cart' });
  }
};
