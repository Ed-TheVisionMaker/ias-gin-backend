const express = require('express');
const User = require('../models/userModal');
const {
  createUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
} = require('../controllers/userControllers');

const router = express.Router();

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
