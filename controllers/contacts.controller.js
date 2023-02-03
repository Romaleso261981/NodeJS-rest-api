const { Contact } = require('../models/contactsSchema');
const { HttpError } = require('../helpers/errors');
const path = require('path');
const fs = require('fs/promises');

async function getAll(req, res) {
  const { limit = 5, page = 1 } = req.query;
  const skip = (page - 1) * limit;
  const contact = await Contact.find().skip(skip).limit(limit);
  if (!contact) {
    return res.status(200);
  }
  return res.status(200).json(contact);
}

async function findOneById(req, res, next) {
  const { id } = req.params;
  const contact = await Contact.findById(id);

  if (!contact) {
    return next(HttpError(404, 'Movie not found'));
  }
  return res.json(contact);
}

async function deleteById(req, res, next) {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    return next(HttpError(404, 'No movie'));
  }
  await Contact.findByIdAndRemove(id);
  return res.status(200).json(contact);
}

async function addContact(req, res, next) {
  const { name, email, phone } = req.body;
  const newContact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).json(newContact);
}

async function updateById(req, res) {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  return res.json({ data: { movie: updatedContact } });
}

async function uploadImage(req, res, next) {
  console.log('req.file', req.file);
  const { filename } = req.file;
  const tmpPath = path.resolve(__dirname, '../tmp', filename);
  const publicPath = path.resolve(__dirname, '../public', filename);
  try {
    await fs.rename(tmpPath, publicPath);
  } catch (error) {
    await fs.unlink(tmpPath);
    throw error;
  }

  const movieId = req.params.id;

  const movie = await Contact.findById(movieId);
  movie.image = `/public/${filename}`;
  await movie.save();

  return res.json({
    data: {
      image: movie.image,
    },
  });
}

module.exports = {
  getAll,
  addContact,
  deleteById,
  updateById,
  findOneById,
  uploadImage,
};
