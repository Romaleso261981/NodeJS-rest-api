const express = require('express');

const {
  getAll,
  addContact,
  deleteById,
  updateById,
  findOneById,
} = require('../../controllers/contacts.controller');
const { tryCatchWrapper } = require('../../helpers/wrapper');

const router = express.Router();

router.get('/', tryCatchWrapper(getAll));

router.get('/:id', tryCatchWrapper(findOneById));

router.post('/', tryCatchWrapper(addContact));

router.delete('/:id', tryCatchWrapper(deleteById));

router.put('/:contactId', tryCatchWrapper(updateById));

router.patch('/:contactId', tryCatchWrapper(updateById));

module.exports = router;
