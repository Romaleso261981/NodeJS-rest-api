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

userRouter.get('/', tryCatchWrapper(auth), tryCatchWrapper(getContacts));
userRouter.post('/', tryCatchWrapper(auth), tryCatchWrapper(createContact));
userRouter.delete('/:id', tryCatchWrapper(auth), tryCatchWrapper(deleteById));
userRouter.patch(
  '/upLoad',
  upload.single('image'),
  tryCatchWrapper(uploadImage)
);
userRouter.get('/me', tryCatchWrapper(auth), tryCatchWrapper(me));

module.exports = {
  userRouter,
};
