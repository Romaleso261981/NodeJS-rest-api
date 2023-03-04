const { Order } = require('../models/order');

async function getContacts(req, res, next) {

  const { type = "inWork" } = req.query;
  try {
    const searchParam = { type };
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

    const savedOrder = await Order.create({
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
};

