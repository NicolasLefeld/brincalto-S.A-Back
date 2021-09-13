const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: String,
  }, { collection: 'products' },
);

module.exports.productSchema = mongoose.model('productModel', productSchema);
