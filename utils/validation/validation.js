const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  phone: Joi.string().min(9).max(14).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'uk'] },
    })
    .required(),
});
const schemaFavorite = Joi.object({ favorite: Joi.boolean().required() });
module.exports = { schema, schemaFavorite };
