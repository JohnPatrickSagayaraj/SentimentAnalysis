const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    is_confirmed: {
      type: Boolean,
      default: false,
      required: true
    },
    is_admin: {
      type: Boolean,
      default: false,
      required: true
    },
    courses: [{
      _id: {
        type: String
      },
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
      comment: {
        type: String
      }
    }]
  }
)

userSchema.plugin(uniquevalidator);

module.exports = mongoose.model("User", userSchema);
