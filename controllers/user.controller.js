const { User } = require('../models/userSchema');
const { NotFound } = require('http-errors');
const { Contact } = require('../models/contactsSchema');
// const path = require('path');
// const fs = require('fs/promises');

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
  const newContact = await User.create({
    name,
    email,
    phone,
  });

  const { _id } = newContact;
  user.contact.push({ _id });

  const updatedUser = await User.findByIdAndUpdate(user._id, user, {
    new: true,
  }).select({ contact: 1, _id: 0 });

  console.log('updatedUser', updatedUser);

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
  console.log('req.file', req.file);
  // const { filename } = req.file;
  // const tmpPath = path.resolve(__dirname, '../tmp', filename);
  // const publicPath = path.resolve(__dirname, '../public', filename);
  // try {
  //   await fs.rename(tmpPath, publicPath);
  // } catch (error) {
  //   await fs.unlink(tmpPath);
  //   throw error;
  // }

  // const movieId = req.params.id;

  // const movie = await Contact.findById(movieId);
  // movie.image = `/public/${filename}`;
  // await movie.save();

  return res.json({
    data: {
      ok: true,
      // image: movie.image,
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
  getContacts,
  deleteById,
  uploadImage,
  me,
};
