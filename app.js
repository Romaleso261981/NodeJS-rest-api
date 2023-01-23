const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const contactsRouter = require('./routes/api/contacts');
const { authRouter } = require('./routes/api/auth');
const { errorHandler } = require('./helpers/helpers');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/contacts', contactsRouter);
app.use('/auth', authRouter);

app.use(errorHandler);

module.exports = app;
