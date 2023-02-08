const { Unauthorized, BadRequest } = require('http-errors');
const jwt = require('jsonwebtoken');
const { User } = require('../models/userSchema');
const multer = require('multer');
const path = require('path');
// const jimp = require('jimp');

const { JWT_SECRET } = process.env;
const tempDir = path.join(__dirname, '../', 'tmp');

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
    const { id } = jwt.verify(token, JWT_SECRET);
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  limits: { fileSise: 2048 },
});

// function resize(w, h) {
//   return async (req, res, next) => {
//     console.log(req.user.image);
//     const filename = req.user.image;
//     const tmpPath = path.resolve(__dirname, filename);
//     console.log(tmpPath);

//     const image = await jimp.read(tmpPath);
//     await image.resize(w, h);
//     await image.writeAsync(tmpPath);

//     next();
//   };
// }

const upload = multer({
  storage,
});

module.exports = {
  validateBody,
  auth,
  upload,
};
