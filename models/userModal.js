const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const newUserSchema = new Schema({
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

// creating my own static sign up method
// statics are methods that are attached to the model, not the instance
newUserSchema.statics.signup = async function (email, password) {
  // normal function since keyword this needs to point towards the model instance that inovkes it
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email already in use');
  }

  // salt adds random characters to password to provde unique hashes
  // even if 2 passwords are the same
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
  });

  return user;
};

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
  newUser: mongoose.model('Login', newUserSchema),
};
