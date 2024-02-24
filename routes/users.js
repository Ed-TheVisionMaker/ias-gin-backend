const express = require('express');
const User = require('../models/userModal');

const router = express.Router();

// GET all users
router.get('/', (req, res) => {
  res.json({ message: 'GET all users' });
});

// GET a single user
router.get('/:id', (req, res) => {
  res.json({ message: 'GET a single user' });
});

// POST a new user
router.post('/', async (req, res) => {
  const { name, email, description, location } = req.body;
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
});

// DELETE a new user
router.delete('/:id', (req, res) => {
  res.json({ message: 'DELETE a new user' });
});

// UPDATE a new user
router.patch('/:id', (req, res) => {
  res.json({ message: 'UPDATE a new user' });
});

module.exports = router;
