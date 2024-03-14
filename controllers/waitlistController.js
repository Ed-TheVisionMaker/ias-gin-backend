import WaitList from '../models/waitListModal';

const registerEmail = async (res, req, next) => {
  const { email } = req.body;
  try {
    const waitList = await WaitList.register(email);

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
