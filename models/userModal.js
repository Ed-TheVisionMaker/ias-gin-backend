const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

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
  if (!email || !password) {
    throw Error('Both email and password must be filled in');
  }

  if (!validator.isEmail(email)) {
    throw Error('Email is invalid');
  }
  // default min 1 lower case, 1 upper case, 1 number, 1 symbol, 8 characters
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough');
  }

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

// static login method
newUserSchema.statics.login = async function (email, password) {
  console.log(email, password, "login static method");
  if (!email || !password) {
    throw Error('Both email and password must be filled in');
  }

  const user = await this.findOne({ email });

  if(!user) {
    throw Error('Incorrect email');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch) {
    throw Error('Incorrect password');
  }

  return user;

};

const userProfileSchema = new Schema(
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
// module.exports = {
//   User: mongoose.model('UserProfile', userProfileSchema),
//   newUser: mongoose.model('User', newUserSchema),
// };

module.exports = mongoose.model('User', newUserSchema);
