const { Contact } = require('../models/contactsSchema');
const { HttpError } = require('../helpers/errors');

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
  // const { Id } = req.params;
  // const contact = await Contact.findById(Id);
  // if (contact) {
  //   await Contact.findByIdAndDelete(Id);
  //   return res.json({ data: { Contact } });
  // }
  // return next(HttpError(404, 'Contact not found'));
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

module.exports = {
  getAll,
  addContact,
  deleteById,
  updateById,
  findOneById,
};
