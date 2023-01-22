const { User } = require('../models/user');

const jwt = require('jsonwebtoken');

const { JWT_TOKEN } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const userMailCheck = await User.findOne({ email });

  if (userMailCheck) {
    console.log(`Email ${email} in use`);
  }
  const newUser = new User({ email });
  await newUser.setPassword(password);
  await newUser.save();

  res.status(201).json({
    code: 201,
    user: {
      email,
      subscription: newUser.subscription,
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
