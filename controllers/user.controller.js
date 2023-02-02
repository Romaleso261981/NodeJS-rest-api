const { User } = require('../models/userSchema');

async function createContact(req, res, next) {
  const { user } = req;
  const { _id } = user;
  const { name, email, phone } = req.body;

  user.contact.push({ name, email, phone });
  await User.findByIdAndUpdate(_id, user);

  return res.status(201).json({
    name,
    email,
    phone,
  });
}

async function getContact(req, res, next) {
  const { user } = req;
  const userWithContact = await User.findById(user._id).populate('contact', {
    phone: 1,
    name: 1,
    email: 1,
  });

  res.status(200).json({
    data: {
      contacts: userWithContact.contact,
    },
  });
}

async function me(req, res, next) {
  const { user } = req;
  const { email, _id: id } = user;

  return res.status(200).json({
    data: {
      user: {
        email,
        id,
      },
    },
  });
}

module.exports = {
  createContact,
  getContact,
  me,
};
