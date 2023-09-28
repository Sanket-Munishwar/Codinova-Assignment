const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  unit_price: Number,
  available_quantity: Number,
});

module.exports = mongoose.model('Product', productSchema);
