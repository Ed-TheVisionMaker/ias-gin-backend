const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const loginSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  //   adds a time created field to the schema
  // also adds time updated field to the schema - possibly, need to check
  { timestamps: true }
);

// automatically creates a collection. Pluralises the name of the model
module.exports = {
  User: mongoose.model('User', userSchema),
  Login: mongoose.model('Login', loginSchema),
};
