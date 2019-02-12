const express = require('express');

const products = require('./products');
const users = require('./users');

const router = express.Router();

router.use('/api/products', products);
router.use('/api/users', users);

module.exports = router;
