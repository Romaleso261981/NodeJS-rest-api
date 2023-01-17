const { Contact } = require('../utils/schema/contactsSchema');
require('dotenv').config();

// const getContactById = async contactId => {
//   const contactsList = await listContacts();
//   const contact = contactsList.find(item => item.id === contactId);
//   return contact;
// };

// const removeContact = async contactId => {
//   return await Contact.findByIdAndDelete(contactId);
// };

// const addContact = async ({ name, email, phone }) => {
//   const contact = await Contact.create({
//     name,
//     email,
//     phone,
//   });
//   return contact;
// };

const updateContact = async (contactId, body) => {
  await Contact.updateOne({ _id: { $eq: contactId } }, { ...body });
  return { message: 'Contact updated succesfully' };
};

// const updateFavorite = async (contactId, body) => {
//   await Contact.updateOne({ _id: { $eq: contactId } }, { ...body });
// };

module.exports = {
  // listContacts,
  // getContactById,
  // removeContact,
  // addContact,
  updateContact,
  // updateFavorite,
};
