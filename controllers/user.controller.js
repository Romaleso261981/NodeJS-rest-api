const { Order } = require('../models/order');
let n = 1;

const setNumber = function () {
  n += 1;
  return n;
};

async function deleteById(req, res, next) {
  const contactId = req.params.id;
  try {
    const contact = await Order.findById(contactId);
    if (contact.type === 'done') {
      contact.type = 'inWork';
    } else {
      contact.type = 'done';
    }
    await contact.save();
    const newContact = await Order.findById(contactId);

    return res.json({
      data: {
        newContact,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getContacts(req, res, next) {
  const { type = 'expenses', month = 0, year = 0 } = req.query;
  try {
    const searchParam = { type, month, year };
    const result = await Order.find(searchParam);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function createContact(req, res, next) {
  try {
    const respons = req.body;
    const {
      name,
      adress,
      completeSet,
      modelTechniques,
      nameTechniques,
      malfunction,
      serialNumber,
      phone,
    } = respons;
    const number = setNumber();

    const savedOrder = await Order.create({
      number,
      name,
      adress,
      completeSet,
      modelTechniques,
      nameTechniques,
      malfunction,
      serialNumber,
      phone,
    });
    res.status(200).json({
      savedOrder,
    });
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  createContact,
  getContacts,
  deleteById,
};
