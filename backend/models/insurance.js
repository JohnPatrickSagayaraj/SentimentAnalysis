const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  hypertension: {
    type: Boolean,
    required: true
  },
  pressure: {
    type: Boolean,
    required: true
  },
  sugar: {
    type: Boolean,
    required: true
  },
  overweight: {
    type: Boolean,
    required: true
  },
  smooking: {
    type: Boolean,
    required: true
  },
  alcohol: {
    type: Boolean,
    required: true
  },
  exercise: {
    type: Boolean,
    required: true
  },
  drugs: {
    type: Boolean,
    required: true
  },
  user: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Course", courseSchema);
