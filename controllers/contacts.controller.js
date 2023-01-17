const { Contact } = require('../models/contactsSchema');
// const { schema, schemaFavorite } = require('../../utils/validation/validation');

async function getAll(req, res, next) {
  const movies = await Contact.find();

  return res.json({
    data: movies,
  });
}

module.exports = {
  getAll,
  // create,
  // deleteById,
  // updateById,
  // findOneById,
};
