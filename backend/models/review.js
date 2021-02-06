const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  review: {
    type: String,
    required: true
  },
  product_id: {
    type: String,
    required: true
  },
  product_name: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    required: true
  },
  feedback: {
    type: Number,
    required: true
  },
  user: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Review", reviewSchema);
