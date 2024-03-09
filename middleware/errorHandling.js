const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack
  res.status(500).json({ message: 'Internal server error' });
};

module.exports = errorHandler;
