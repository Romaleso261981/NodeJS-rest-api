const { User } = require('../models/user');

export const registration = async (req, res) => {
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
