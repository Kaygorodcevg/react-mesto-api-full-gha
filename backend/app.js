require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const validationErrors = require('celebrate').errors;
const cors = require('cors');
const mainRouter = require('./routes');
const err = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://0.0.0.0:27017/mestodb');

app.use(cors(
  {
    origin: ['https://mesto.full-front.nomoredomains.monster', 'http://mesto.full-front.nomoredomains.monster', 'localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    // exposedHeaders: ['set-cookie'],
    credentials: true,
    preflightContinue: false,
    optionSuccessStatus: 200,
  },
));
app.use(helmet());
app.use(limiter);
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
