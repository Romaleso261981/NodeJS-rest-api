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

router.get('/:Id', tryCatchWrapper(findOneById));

router.post('/', tryCatchWrapper(addContact));

router.delete('/:Id', tryCatchWrapper(deleteById));

router.put('/:Id', tryCatchWrapper(updateById));

router.patch('/:Id', tryCatchWrapper(updateById));

module.exports = router;
