const express = require('express');
const {
  loginUser,
  signupUser,
  createUserProfile,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
} = require('../controllers/userControllers');
const requireAuth = require('../middleware/requireAuth');
const errorHandling = require('../middleware/errorHandling');

const router = express.Router();

//Login route
router.post('/login', loginUser);

//signup route
router.post('/signup', signupUser);

// Fire this middleware function before all the routes.
// if this fails the error prevents next() being triggered
// so the other controller functions don't get triggered
// router.use(requireAuth);

// GET all users
router.get('/', getUsers);

// GET a single user
router.get('/:id', getUser);

// POST a new user
router.post('/', createUserProfile);

// DELETE a new user
router.delete('/:id', deleteUser);

// UPDATE a new user
router.patch('/:id', updateUser);

router.use(errorHandling);

module.exports = router;
