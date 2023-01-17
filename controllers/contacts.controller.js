const { Contact } = require('../models/contactsSchema');
const { createNotFoundHttpError } = require('../helpers');
// const { schema, schemaFavorite } = require('../../utils/validation/validation');

async function getAll(req, res, next) {
  const movies = await Contact.find();

  return res.json({
    data: movies,
  });
}

async function findOneById(contactId) {
  const contactsList = await getAll();
  const contact = contactsList.find(item => item.id === contactId);
  return contact;
}

async function deleteById(req, res, next) {
  const { Id } = req.params;
  const movie = await Contact.findById(Id);
  if (movie) {
    await Contact.findByIdAndDelete(Id);
    return res.json({ data: { Contact } });
  }
  return next(createNotFoundHttpError());
}

async function create(req, res, next) {
  const createdMovie = await Contact.create(req.body);
  return res.status(201).json({
    data: {
      movie: createdMovie,
    },
  });
}

module.exports = {
  getAll,
  create,
  deleteById,
  // updateById,
  findOneById,
};
