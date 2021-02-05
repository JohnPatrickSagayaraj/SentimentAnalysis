const mongoose = require('mongoose');

const sentimentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  reviews: {
    type: Array,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  user: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Sentiment", sentimentSchema);
