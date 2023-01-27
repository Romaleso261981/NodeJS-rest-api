const { Contact } = require('../models/contactsSchema');
const { HttpError } = require('../helpers/errors');

async function listContacts() {
  return await Contact.find();
}

async function getAll(_, res) {
  const contact = await listContacts();
  if (!contact) {
    return res.status(200);
  }
  return res.status(200).json(contact);
}

async function findOneById(req, res, next) {
  const { id } = req.params;
  const contactsList = await listContacts();
  const contact = contactsList.find(item => item.id === id);
  return contact;
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
