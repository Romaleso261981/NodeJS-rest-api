const express = require('express');
const { tryCatchWrapper } = require('../../helpers/wrapper');
const {
  createContact,
  getContacts,
  deleteById,
  uploadImage,
  verifyEmail,
  verifyEmailAgain,
  me,
} = require('../../controllers/user.controller');
const { auth, upload } = require('../../middlewares');
const userRouter = express.Router();

userRouter.get('/', tryCatchWrapper(auth), tryCatchWrapper(getContacts));
userRouter.post('/', tryCatchWrapper(auth), tryCatchWrapper(createContact));
userRouter.delete('/:id', tryCatchWrapper(auth), tryCatchWrapper(deleteById));
userRouter.patch(
  '/upLoad',
  tryCatchWrapper(auth),
  upload.single('avatar'),
  tryCatchWrapper(uploadImage)
);
userRouter.get('/me', tryCatchWrapper(auth), tryCatchWrapper(me));
userRouter.get('/verify/:verificationToken', tryCatchWrapper(verifyEmail));
userRouter.post('/verify', tryCatchWrapper(verifyEmailAgain));

module.exports = {
  userRouter,
};
