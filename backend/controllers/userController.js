// controllers/userController.js

const User = require('../models/User');
const Product = require('../models/Product');
const Portfolio = require('../models/Portfolio');

// GET /user/me
const getUser = async (req, res) => {
  try {
    
    const userId = req.userId; // From auth middleware (decoded token)

    const user = await User.findById(userId).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /all-products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /product/:id
const getSingleProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId); // Fetch product by ID

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /portfolio/:designerId
const getPortfolioByDesigner = async (req, res) => {
  try {
    const designerId = req.params.designerId;
    const portfolio = await Portfolio.find({ designerId }); // Fetch portfolio for a specific designer

    if (!portfolio || portfolio.length === 0) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    res.json(portfolio);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /all-portfolios
const getAllPortfolio = async (req, res) => {
  try {
    const portfolios = await Portfolio.find(); // Fetch all portfolios
    if (!portfolios || portfolios.length === 0) {
      return res.status(404).json({ message: 'No portfolios found' });
    }
    res.json(portfolios);
  } catch (error) {
    console.error('Error fetching all portfolios:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  getUser,
  getAllProducts,
  getSingleProduct,
  getPortfolioByDesigner,
  getAllPortfolio,
};
