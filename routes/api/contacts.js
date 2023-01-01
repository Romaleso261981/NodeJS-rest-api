const express = require('express');
const contact = require('../../models/contacts.json');

const router = express.Router();

router.get('/', async (req, res, next) => {
  res.json(contact);
});

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template getId message' });
});

router.post('/', async (req, res, next) => {
  res.json({ message: 'template post message' });
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template delete message' });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template put message' });
});

module.exports = router;
