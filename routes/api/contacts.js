const express = require('express');
const contact = require('../../models/contacts.json');

const router = express.Router();

router.get('/', async (req, res, next) => {
  res.json(contact);
});

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template get contactId message' });
});

router.post('/', async (req, res, next) => {
  res.json({ message: 'template postAll  message' });
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template delete contactId message' });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template put contactId message' });
});

module.exports = router;
