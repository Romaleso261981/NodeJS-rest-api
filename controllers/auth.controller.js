const { User } = require('../models/userSchema');

const jwt = require('jsonwebtoken');

const { JWT_TOKEN } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const savedUser = await User.create({
    email,
    password,
  });

  res.status(201).json({
    data: {
      user: savedUser,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    console.log('Email or password is wrong');
  }

  const payload = { id: user._id, email: user.email };

  const token = jwt.sign(payload, JWT_TOKEN);
  user = await User.findByIdAndUpdate(user._id, { token }, { new: true });

  res.status(200).json({
    code: 200,
    data: {
      token,
      user: {
        email,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = {
  login,
  register,
};
