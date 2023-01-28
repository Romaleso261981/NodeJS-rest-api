const { User } = require('../models/userSchema');

async function createContact(req, res, next) {
  const { user } = req;
  const { id: contactId } = req.body;
  console.log(contactId);
  console.log(user);

  user.contact.push({ _id: contactId });
  await User.findByIdAndUpdate(user._id, user);

  return res.status(201).json({
    data: {
      contact: user.contact,
    },
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
