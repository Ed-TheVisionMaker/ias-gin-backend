const { User, UserProfile } = require('../models/userModal');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

// login user
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const id = user._id;

    const token = createToken(id);

    res.status(200).json({ email, token, id });
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: error.message });
    } else {
      next(error);
    }
  }
};

// signup user
const signupUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    await UserProfile.create({
      userId: user._id,
    });

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: error.message });
    } else {
      next(error);
    }
  }
};

// GET all users
const getUsers = async (req, res) => {
  try {
    //   get all docs from db in descending order by createdAt
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// This may have to change as I used a schema in the old app. So I need to find
// out what the way to update a user and add functionality to it is.
// perhaps it will be adding fields that aren't required.

// GET a single user
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'User not found, id invalid' });
  }
  //   get doc from db by id
  const userProfile = await UserProfile.findOne({userId: id})

  if (!userProfile) {
    return res.status(404).json({ error: 'User not found, no user' });
  }

  res.status(200).json(userProfile);
};

// create a new user
const createUser = async (req, res) => {
  const { name, email, description, location } = req.body;
  //   add doc to db
  try {
    const user = await User.create({
      name,
      email,
      description,
      location,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'User not found' });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(user);
};

// update a user
const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'User not found' });
  }

  const user = await User.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(user);
};

module.exports = {
  loginUser,
  signupUser,
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
};
