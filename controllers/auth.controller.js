// const { createUser, findUserByEmail } = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Conflict, Unauthorized } = require('http-errors');
const { User } = require('../models/userSchema');

// const { JWT_SECRET } = process.env;

async function register(req, res, next) {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const savedUser = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      data: {
        user: {
          email,
          id: savedUser._id,
        },
      },
    });
  } catch (error) {
    if (error.message.includes('E11000 duplicate key error')) {
      throw Conflict('User with this email already exists!');
    }

    throw error;
  }
}
async function login(req, res, next) {
  const { email, password } = req.body;

  const storedUser = await User.findOne({
    email,
  });
  if (!storedUser) {
    throw Unauthorized('email is not valid');
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);

  if (!isPasswordValid) {
    throw Unauthorized('password is not valid');
  }
  const payload = { id: storedUser._id };
  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return res.json({
    data: {
      token: token,
    },
  });
}

async function logoutController(req, res) {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.sendStatus(204);
}
async function currentUserController(req, res) {
  const { email, subscription } = req.user;
  return res.status(200).json({
    email,
    subscription,
  });
}
module.exports = {
  register,
  login,
  logoutController,
  currentUserController,
};
