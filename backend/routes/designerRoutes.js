const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer"); // your multer setup
const authenticateDesigner = require("../middleware/authenticateDesigner");

const {uploadImageHandler} = require("../controllers/imageHandler");
console.log(uploadImageHandler);

const {updatePortfolio, getPortfolio} = require("../controllers/portfolioController");

// Import Product and Portfolio controllers
const {
  addProduct,
  getProductsByDesigner,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const {
  addPortfolioPost,
  getPortfolioPosts,
  updatePortfolioPost,
  deletePortfolioPost,
} = require("../controllers/portfolioPostController");

// ---------- PRODUCT ROUTES ----------
router.post("/add-product", authenticateDesigner, addProduct);
router.get("/products/me", authenticateDesigner, getProductsByDesigner);
router.put("/update-product/:id", authenticateDesigner, updateProduct);
router.delete("/delete-product/:id", authenticateDesigner, deleteProduct);

router.post("/upload-image", upload.single("image"), uploadImageHandler);


// ---------- PORTFOLIO ROUTES ----------
router.post("/addportfoliopost", authenticateDesigner, addPortfolioPost);
router.get("/portfolioposts/:id", getPortfolioPosts);
router.put("/updateportfoliopost/:id", authenticateDesigner, updatePortfolioPost);
router.delete("/deleteportfoliopost/:id", authenticateDesigner, deletePortfolioPost);


router.get('/getportfolio', authenticateDesigner, getPortfolio);
router.post('/updateportfolio', authenticateDesigner, updatePortfolio);


module.exports = router;
