const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  product_name: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  pcode: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model("Product", productSchema);
