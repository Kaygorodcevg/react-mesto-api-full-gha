const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const validationErrors = require('celebrate').errors;
const cors = require('cors');
const mainRouter = require('./routes');
const err = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://0.0.0.0:27017/mestodb');

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(requestLogger);
app.use('/', mainRouter);
app.use(errorLogger);
app.use(validationErrors());
app.use(err);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
