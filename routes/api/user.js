const express = require('express');
const { tryCatchWrapper } = require('../../helpers/wrapper');
const {
  createContact,
  getContacts,
  deleteById,
  uploadImage,
  me,
} = require('../../controllers/user.controller');
const { auth, upload } = require('../../middlewares');
const userRouter = express.Router();

userRouter.get('/', tryCatchWrapper(getContacts));
userRouter.post('/', tryCatchWrapper(createContact));
userRouter.delete('/:id', tryCatchWrapper(deleteById));
userRouter.patch(
  '/upLoad',
  tryCatchWrapper(auth),
  upload.single('avatar'),
  tryCatchWrapper(uploadImage)
);
userRouter.get('/me', tryCatchWrapper(auth), tryCatchWrapper(me));

module.exports = {
  userRouter,
};
