const { Unauthorized, BadRequest } = require('http-errors');
const jwt = require('jsonwebtoken');
const { User } = require('../models/userSchema');

// const { JWT_SECRET } = process.env;

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw BadRequest();
    }

    return next();
  };
}

async function auth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer') {
    throw Unauthorized('token type is not valid');
  }

  if (!token) {
    throw Unauthorized('no token provided');
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    req.user = user;
  } catch (error) {
    if (
      error.name === 'TokenExpiredError' ||
      error.name === 'JsonWebTokenError'
    ) {
      throw Unauthorized('jwt token is not valid');
    }
    throw error;
  }

  next();
}

module.exports = {
  validateBody,
  auth,
};
