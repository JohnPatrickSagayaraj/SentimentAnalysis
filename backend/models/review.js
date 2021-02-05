const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  review: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    required: true
  },
  user: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Review", reviewSchema);
