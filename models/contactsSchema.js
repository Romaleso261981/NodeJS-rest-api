const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      default: 'Roma',
    },
    email: {
      type: String,
      default: 'Lesyo',
    },
    phone: {
      type: String,
      default: '0689478723',
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Contact = mongoose.model('contact', contactSchema);
module.exports = {
  Contact,
};
