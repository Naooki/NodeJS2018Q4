const express = require('express');

const auth = require('../controllers/auth');

const router = express.Router();

router.post('/', auth.auth);
router.post('/local', auth.authPassportLocal);

module.exports = router;
