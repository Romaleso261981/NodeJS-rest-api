const { Contact } = require('../models/contactsSchema');
const { createNotFoundHttpError, HttpError } = require('../helpers');

async function getAll(req, res) {
  const { limit } = req.query;
  const movies = await Contact.find().limit(limit);

  return res.json({
    data: movies,
  });
}

async function findOneById(req, res, next) {
  const { id } = req.params;
  const movie = await Contact.findById(id);

  if (!movie) {
    return next(HttpError(404, 'Movie not found'));
  }
  return res.json(movie);
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

const addContact = async (req, res, next) => {
  const createdContact = await Contact.create(req.body);
  return res.status(201).json({
    data: {
      movie: createdContact,
    },
  });
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedMovie = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  return res.json({ data: { movie: updatedMovie } });
};

module.exports = {
  getAll,
  addContact,
  deleteById,
  updateById,
  findOneById,
};
