const Waitlist = require('../models/waitlistModal');

const registerEmail = async (req, res, next) => {
  console.log(req.body, 'registerEmail')
  console.log(res, 'res')
  const email = req.body?.email;
  try {
    const waitList = await Waitlist.register(email);

    

    res.status(200).json({ email });
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: error.message });
    } else {
      next(error);
    }
  }
};

module.exports = { registerEmail };
