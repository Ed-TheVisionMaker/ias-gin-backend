const jwt = require('jsonwebtoken');
const User = require('../models/userModal');

const requireAuth = async (req, res, next) => {
  // verify authentication;
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }
  // authourization = string Bearer token
  const token = authorization.split(' ')[1];

  try {
    // if JWT verify success, returns a payload
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    //store just the ID - a slimmed down version of the User document
    req.user = await User.findOne({_id}).select('_id');
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Request not authorized' });
  }
};

module.exports = requireAuth;
