const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
module.exports = mongoose.model('User', userSchema);
