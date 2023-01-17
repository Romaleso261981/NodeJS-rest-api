const express = require('express');

const movieController = require('../../controllers/contacts.controller');
const { tryCatchWrapper } = require('../../helpers');
// const { createNotFoundHttpError } = require('../helpers');

const router = express.Router();

router.get('/', tryCatchWrapper(movieController.getAll));

router.get('/:contactId', tryCatchWrapper(movieController.findOneById));

router.post('/', tryCatchWrapper(movieController.create));

router.delete('/:contactId', tryCatchWrapper(movieController.deleteById));

router.put('/:contactId', tryCatchWrapper(movieController.getAll));

router.patch('/:contactId', tryCatchWrapper(movieController.getAll));

module.exports = router;
