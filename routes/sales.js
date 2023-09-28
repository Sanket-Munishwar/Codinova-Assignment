const express = require('express');
const router = express.Router();
const Sale = require('../models/sale');
const Product = require('../models/product');

// Save Sales/Order Data API
router.post('/add', async (req, res) => {
  try {
    const saleData = req.body;

    const sale = new Sale(saleData);

    // Calculate the invoice total based on products sold, discount, and VAT
    let invoiceTotal = 0;
    for (const productSold of saleData.products_sold) {
      const product = await Product.findById(productSold.product_id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      // Check if there is enough available quantity for the product
      if (product.available_quantity < productSold.quantity) {
        return res.status(400).json({ message: 'Insufficient available quantity for a product' });
      }

      const productTotal = productSold.price * productSold.quantity;
      invoiceTotal += productTotal;
    }

    // Apply discount and VAT
    invoiceTotal -= saleData.discount;
    invoiceTotal *= 1 + saleData.vat / 100;

    sale.invoice_total = invoiceTotal;

    // Save the sale to the database
    await sale.save();

    // Update available quantities of products sold
    for (const productSold of saleData.products_sold) {
      const product = await Product.findById(productSold.product_id);
      product.available_quantity -= productSold.quantity;
      await product.save();
    }

    res.status(201).json({ message: 'Sale data saved successfully' , data:sale});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving sale data' });
  }
});

module.exports = router;
