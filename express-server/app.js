const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const cookieParser = require('./middlewares/cookieParser');
const queryParser = require('./middlewares/queryParser');
const router = require('./routes');

const app = express();

app.use(cookieParser);
app.use(queryParser);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

module.exports = app;
