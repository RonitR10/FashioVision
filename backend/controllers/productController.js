const Product = require("../models/Product");

// Add new product
const addProduct = async (req, res) => {
  try {
    const {
      title,
      brand,
      description,
      price,
      salePrice,
      sizes,
      color,
      material,
      category,
      collection,
      images, // now matches schema
      stock,
      tags,     // optional
      status,   // optional
    } = req.body;

    const designerId = req.userId; // From authenticated token

    const newProduct = new Product({
      title,
      brand,
      description,
      price,
      salePrice,
      isOnSale: !!salePrice, // if salePrice exists, mark as on sale
      sizes,
      color,
      material,
      category,
      collection,
      images,
      stock: stock || 0,
      tags: tags || [],
      status: status || "active",
      designer: designerId,
    });

    await newProduct.save();

    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
};

// Get all products created by a designer
const getProductsByDesigner = async (req, res) => {
  try {
    const userId = req.userId;
    const products = await Product.find({ designer: userId });
    res.status(200).json({ products });
  } catch (error) {
    console.error("Fetch Products Error:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const {
      title,
      brand,
      description,
      price,
      salePrice,
      sizes,
      color,
      material,
      category,
      collection,
      images,
      stock,
      tags,
      status,
    } = req.body;

    const productId = req.params.id;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        title,
        brand,
        description,
        price,
        salePrice,
        isOnSale: !!salePrice,
        sizes,
        color,
        material,
        category,
        collection,
        images,
        stock,
        tags,
        status,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ error: "Product not found" });

    res.status(200).json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) return res.status(404).json({ error: "Product not found" });

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};

module.exports = {
  addProduct,
  getProductsByDesigner,
  updateProduct,
  deleteProduct,
};
