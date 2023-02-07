const { Schema, model } = require('mongoose');

const Contactschema = Schema;

const contactSchema = new Contactschema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    image: {
      type: String,
      default: '',
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Contact = model('contact', contactSchema);
module.exports = {
  Contact,
};
