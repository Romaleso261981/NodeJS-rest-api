const { User } = require('../models/userSchema');
const { NotFound, BadRequest } = require('http-errors');
const { Contact } = require('../models/contactsSchema');
const path = require('path');
const fs = require('fs/promises');
const jimp = require('jimp');

async function getContacts(req, res, next) {
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

async function createContact(req, res, next) {
  const { user } = req;
  const { name, email, phone } = req.body;
  const newContact = await Contact.create({
    name,
    email,
    phone,
  });

  const { _id } = newContact;
  user.contact.push({ _id });

  const updatedUser = await User.findByIdAndUpdate(user._id, user, {
    new: true,
  }).select({ contact: 1, _id: 0 });

  return res.status(201).json({
    data: {
      contact: updatedUser.contact,
    },
  });
}

async function deleteById(req, res, next) {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    NotFound('No contact');
  }
  await Contact.findByIdAndRemove(id);
  return res.status(200).json(contact);
}

async function uploadImage(req, res, next) {
  const { filename } = req.file;
  const tmpPath = path.resolve(__dirname, '../tmp', filename);

  const image = await jimp.read(tmpPath);
  await image.resize(50, 50);
  await image.writeAsync(tmpPath);

  const publicPath = path.resolve(__dirname, '../public', filename);
  try {
    await fs.rename(tmpPath, publicPath);
  } catch (error) {
    await fs.unlink(tmpPath);
    throw error;
  }

  const { user } = req;
  const contact = await User.findById(user._id);

  contact.image = `/public/${filename}`;
  await contact.save();

  return res.json({ user: contact });
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

async function verifyEmail(req, res, next) {
  console.log('verifyEmail');
  const { token } = req.params;
  const user = await User.findOne({
    verificationToken: token,
  });
  console.log(user);

  if (!user) {
    throw BadRequest('Verify token is not valid!');
  }

  await User.findByIdAndUpdate(user._id, {
    verified: true,
    verificationToken: null,
  });

  return res.json({
    message: 'Success',
  });
}
module.exports = {
  createContact,
  getContacts,
  deleteById,
  uploadImage,
  verifyEmail,
  me,
};
