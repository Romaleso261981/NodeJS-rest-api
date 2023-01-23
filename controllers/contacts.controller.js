const { Contact } = require('../models/contactsSchema');
const { HttpError } = require('../helpers/errors');

const listContacts = async () => {
  return await Contact.find();
};

async function getAll(req, res) {
  const { limit } = req.query;
  const contact = await Contact.find().limit(limit);
  console.log(contact);
  return res.json({
    message: 'Contact updated succesfully',
    data: contact,
  });
}

async function findOneById(req, res, next) {
  const contactsList = await listContacts();

  const { id } = req.params;
  const contact = contactsList.find(item => item.id === id);

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
