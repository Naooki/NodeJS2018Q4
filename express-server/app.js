const express = require('express');

const cookieParser = require('./middlewares/cookieParser');
const queryParser = require('./middlewares/queryParser');

const app = express();

app.use(cookieParser);
app.use(queryParser);

module.exports = app;
