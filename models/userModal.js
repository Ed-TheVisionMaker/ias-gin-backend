const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { createCustomError } = require('../utils/errorHandler');

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
  // profile: { type: Schema.Types.ObjectId, ref: 'UserProfile' },
});

// creating my own static sign up method
// statics are methods that are attached to the model, not the instance
newUserSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw createCustomError(
      'Both email and password must be filled in',
      'ValidationError'
    );
  }

  if (!validator.isEmail(email)) {
    throw createCustomError('Email is invalid', 'ValidationError');
  }
  // default min 1 lower case, 1 upper case, 1 number, 1 symbol, 8 characters
  if (!validator.isStrongPassword(password)) {
    throw createCustomError('Password not strong enough', 'ValidationError');
  }

  // normal function since keyword this needs to point towards the model instance that inovkes it
  const exists = await this.findOne({ email });

  if (exists) {
    throw createCustomError('Email already in use', 'ValidationError');
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

// static login method
newUserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('Both email and password must be filled in');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw createCustomError('Incorrect email', 'ValidationError');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    // throw Error('Incorrect password');
    throw createCustomError('Incorrect password', 'ValidationError');
  }

  return user;
};

const userProfileSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    profilePhoto: { type: String },
    // add any additional fields here
  },
  { timestamps: true }
);

// mongoose automatically pluralises string as a collection.
module.exports = {
  User: mongoose.model('User', newUserSchema),
  UserProfile: mongoose.model('UserProfile', userProfileSchema),
};
