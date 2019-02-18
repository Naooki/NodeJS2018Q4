const express = require('express');

const auth = require('./auth');
const products = require('./products');
const users = require('./users');

const router = express.Router();

router.use('/api/auth', auth);
router.use('/api/products', products);
router.use('/api/users', users);

module.exports = router;
