const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  invoice_number: String,
  employee_id: String,
  date_of_sale: Date,
  products_sold: [
    {
      product_id: mongoose.Schema.Types.ObjectId,
      price: Number,
      quantity: Number,
    },
  ],
  discount: Number,
  vat: Number,
  invoice_total: Number,
});

module.exports = mongoose.model('Sale', saleSchema);
