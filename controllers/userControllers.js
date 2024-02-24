const User = require('../models/userModal');
const mongoose = require('mongoose');

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

// GET a single user
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'User not found' });
  }
  //   get doc from db by id
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(user);
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

// update a user

module.exports = {
  createUser,
  getUsers,
  getUser,
};
