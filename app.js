const express = require('express');
const logger = require('morgan');

const { authRouter } = require('./routes/api/auth');
const { userRouter } = require('./routes/api/user');
const { errorHandler } = require('./helpers/helpers');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(express.json());
app.use('/public', express.static('public'));

app.use('/auth', authRouter);
app.use('/user', userRouter);

app.use(errorHandler);

module.exports = app;
