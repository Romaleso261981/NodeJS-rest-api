const { Contact } = require('../models/contactsSchema');
const { HttpError } = require('../helpers/errors');

async function getAll(req, res) {
  const { limit } = req.query;
  const contact = await Contact.find().limit(limit);
  return res.json({
    data: contact,
  });
}

async function findOneById(req, res, next) {
  const { id } = req.params;
  const contact = await Contact.findById(id);

  if (!contact) {
    return next(HttpError(404, 'Contact not found'));
  }
  return res.json(contact);
}

async function deleteById(req, res, next) {
  const { Id } = req.params;
  const contact = await Contact.findById(Id);
  if (contact) {
    await Contact.findByIdAndDelete(Id);
    return res.json({ data: { Contact } });
  }
  return next(HttpError(404, 'Contact not found'));
}

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;

  const newContact = await Contact.create(name, email, phone);
  res.status(201).json(newContact);
};

// const addContact = async ({ name, email, phone }) => {
//     const contact = await Contact.create({
//       name,
//       email,
//       phone,
//     });
//     return contact;
//   };

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  return res.json({ data: { movie: updatedContact } });
};

module.exports = {
  getAll,
  addContact,
  deleteById,
  updateById,
  findOneById,
};
