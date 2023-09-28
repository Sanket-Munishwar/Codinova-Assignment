const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const verify = require('../verifytoken')

// Add Product API (Admin)
router.post('/add', verify,async (req, res) => {
  try {
    
    const productData = req.body;

    // Create a new product using the Product model
    const product = new Product(productData);

    // Save the product to the database
    await product.save();

    res.status(201).json({ message: 'Product added successfully', data:product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding product' });
  }
});

// Fetch Product List API
router.get('/fetch', async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

module.exports = router;
