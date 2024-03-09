function createCustomError(message, name = 'CustomError') {
  const error = new Error(message);
  error.name = name;  
  return error;
}

module.exports = { createCustomError };
