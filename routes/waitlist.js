const express = require('express');
const { registerEmail } = require('../controllers/waitlistController');
const errorHandling = require('../middleware/errorHandling');

const router = express.Router();

router.post('/register-email', registerEmail);

router.use(errorHandling);

module.exports = router;