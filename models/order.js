// const { boolean } = require('joi');
const { Schema, model } = require('mongoose');

const Contactschema = Schema;

const contactSchema = new Contactschema(
  {
    name: {
      type: String,
      required: [true, 'Set name for name'],
    },
    phone: {
      type: String,
      required: [true, 'Set name for phone'],
    },
    adress: {
      type: String,
      required: [true, 'Set name for adress'],
    },
    completeSet: {
      type: String,
      required: [true, 'Set name for completeSet'],
    },
    modelTechniques: {
      type: String,
      required: [true, 'Set name for modelTechniques'],
    },
    nameTechniques: {
      type: String,
      required: [true, 'Set name for nameTechniques'],
    },
    malfunction: {
      type: String,
      required: [true, 'Set name for malfunction'],
    },
    serialNumber: {
      type: String,
      required: [true, 'Set name for serialNumber'],
    },
    repaired: {
      type: String,
      default: "inWork",
    },
    type: {
      type: String,
      enum: ["done", "inWork"],
      default: "inWork",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Order = model('contact', contactSchema);

module.exports = {
  Order,
};
