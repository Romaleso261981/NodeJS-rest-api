const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/[a-z0-9]+@[a-z0-9]+/, 'user email is not valid!'], // simple check
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [6, 'password should be at least 6 characters long'],
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
    versionKey: false,
  }
);

const User = mongoose.model('user', userSchema);

module.exports = { User };
