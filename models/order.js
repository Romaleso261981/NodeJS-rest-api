// const { boolean } = require('joi');
const { Schema, model } = require('mongoose');

const Contactschema = Schema;

const contactSchema = new Contactschema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    number: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    adress: {
      type: String,
      default: '',
    },
    completeSet: {
      type: String,
      default: 'нічого',
    },
    modelTechniques: {
      type: String,
    },
    nameTechniques: {
      type: String,
      required: [true, 'Set name for modelTechniques'],
    },
    malfunction: {
      type: String,
      default: '',
    },
    serialNumber: {
      type: String,
      default: '',
    },
    descriptionRepair: {
      type: String,
      default: '',
    },
    cost: {
      type: String,
      default: 0,
    },
    repaired: {
      type: String,
      default: 'inWork',
    },
    type: {
      type: String,
      enum: ['done', 'inWork'],
      default: 'inWork',
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
