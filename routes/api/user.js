const express = require('express');
const { tryCatchWrapper } = require('../../helpers/wrapper');
const {
  createContact,
  getContact,
  me,
} = require('../../controllers/user.controller');
// const { auth } = require('../../middlewares');
const userRouter = express.Router();

userRouter.post('/contact', tryCatchWrapper(createContact));
userRouter.get('/contact', tryCatchWrapper(getContact));
userRouter.get('/me', tryCatchWrapper(me));

module.exports = {
  userRouter,
};
