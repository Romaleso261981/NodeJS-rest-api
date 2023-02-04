const { User } = require('../models/userSchema');
const { Contact } = require('../models/contactsSchema');

async function createContact(req, res, next) {
  const { user } = req;
  const { name, email, phone } = req.body;
  const newContact = await Contact.create({
    name,
    email,
    phone,
  });

  const { _id: ID } = newContact;
  user.contact.push({ _id: ID });

  const updatedUser = await User.findByIdAndUpdate(user._id, user, {
    new: true,
  }).select({
    contact: 1,
    _id: 0,
  });

  console.log('updatedUser', updatedUser);

  return res.status(201).json({
    data: {
      contact: updatedUser.contact,
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
