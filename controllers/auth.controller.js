// const { createUser, findUserByEmail } = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Conflict } = require('http-errors');
const { User } = require('../models/userSchema');
const { HttpError } = require('../helpers/errors');

async function register(req, res, next) {
  const { email, password } = req.body;

  try {
    const savedUser = await User.create({
      email,
      password: password,
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
      // throw new HttpError(409, "User with this email already exists");
      throw Conflict('User with this email already exists!');
    }

    throw error;
  }
}
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const storedUser = await User.findOne({
      email,
    });
    if (!storedUser) {
      throw new HttpError(401, 'email or password is not valid');
    }

    const isPasswordValid = await bcrypt.compare(password, storedUser.password);

    if (!isPasswordValid) {
      throw new HttpError(401, 'email or password is not valid');
    }
    const token = jwt.sign({ id: storedUser._id }, process.env.JWT_SECRET, {
      expiresIn: '12h',
    });
    await User.findByIdAndUpdate(storedUser._id, { token });
    return res.status(201).json({
      token: token,
      user: {
        email: email,
        subscription: storedUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};
const logoutController = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.sendStatus(204);
};
const currentUserController = async (req, res) => {
  const { email, subscription } = req.user;
  return res.status(200).json({
    email,
    subscription,
  });
};
module.exports = {
  register,
  login,
  logoutController,
  currentUserController,
};
