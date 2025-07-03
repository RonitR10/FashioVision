const express = require("express");
const router = express.Router();
const {
  getUser,
  getAllProducts,
  getSingleProduct,
  getPortfolioByDesigner,
  getAllPortfolio
} = require("../controllers/userController");

router.get("/user/me", getUser);
router.get("/all-products", getAllProducts);
router.get("/product/:id", getSingleProduct);
router.get("/portfolio/:designerId", getPortfolioByDesigner);
router.get("/all-portfolios", getAllPortfolio);
// routes/productRoutes.js
router.post('/products/bulk', async (req, res) => {
  try {
    const { productIds } = req.body;
    const products = await Product.find({ _id: { $in: productIds } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

module.exports = router;
