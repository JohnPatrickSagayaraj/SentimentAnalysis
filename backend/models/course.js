const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  uri: {
    type: String,
    required: true
  },
  startdate: {
    type: Date
  },
  enddate: {
    type: Date
  },
  createddate: {
    type: Date
  },
  users: [{
    _id: {
      type: String
    },
    comment: {
      type: String
    }
  }]
})

module.exports = mongoose.model("Course", courseSchema);
