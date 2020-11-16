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
    insurances: [{
      _id: {
        type: String
      },
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
      }
    }]
  }
)

userSchema.plugin(uniquevalidator);

module.exports = mongoose.model("User", userSchema);
