const { Contact } = require('../models/contactsSchema');
const { NotFound } = require('http-errors');

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
  const { Id } = req.params;
  const contact = await Contact.findById(Id);
  if (contact) {
    // await Contact.findByIdAndDelete(Id);
    return res.json({ data: { contact } });
  }
  return NotFound('Contact not found');
}

async function deleteById(req, res, next) {
  const { Id } = req.params;
  const contact = await Contact.findById(Id);
  if (contact) {
    await Contact.findByIdAndDelete(Id);
    return res.json({ data: { contact } });
  }
  return NotFound('Contact not found');
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
