const express = require('express');

const cookieParser = require('./middlewares/cookieParser');
const queryParser = require('./middlewares/queryParser');
const router = require('./routes');

const app = express();

app.use(cookieParser);
app.use(queryParser);
app.use('/', router);

module.exports = app;
