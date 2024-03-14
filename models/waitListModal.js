const mongoose = require('mongoose');
const validator = require('validator');
const { createCustomError } = require('../utils/errorHandler');

const Schema = mongoose.Schema;

const waitlistSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

waitlistSchema.statics.register = async function (email) {
  if (!email) {
    throw createCustomError('Email is required', 'ValidationError');
  }

  if (!validator.isEmail(email)) {
    throw createCustomError('Email is invalid', 'ValidationError');
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw createCustomError('Email already registered', 'ValidationError');
  }
  const waitList = await this.create({
    email,
  });
  return waitList;
};

module.exports = mongoose.model('Waitlist', waitlistSchema);
