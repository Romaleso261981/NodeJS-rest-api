const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: { type: String },
    contact: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contact',
      },
    ],
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
    versionKey: false,
  }
);

const User = mongoose.model('user', userSchema);

module.exports = { User };
