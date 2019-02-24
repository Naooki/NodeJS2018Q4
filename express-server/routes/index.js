const express = require('express');

const auth = require('./auth');
const products = require('./products');
const users = require('./users');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.use('/api/auth', auth);
router.use('/api/products', verifyToken, products);
router.use('/api/users', verifyToken, users);

module.exports = router;
