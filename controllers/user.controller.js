const { Order } = require('../models/order');

async function getContacts(req, res, next) {}

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
