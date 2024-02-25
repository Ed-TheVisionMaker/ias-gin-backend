const express = require('express');
const User = require('../models/userModal');
const {
  loginUser,
  signupUser,
  createUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
} = require('../controllers/userControllers');

const router = express.Router();

//Login route
router.post('/login', loginUser);

//signup route
router.post('/signup', signupUser);

// GET all users
router.get('/', getUsers);

// GET a single user
router.get('/:id', getUser);

// POST a new user
router.post('/', createUser);

// DELETE a new user
router.delete('/:id', deleteUser);

// UPDATE a new user
router.patch('/:id', updateUser);

module.exports = router;
