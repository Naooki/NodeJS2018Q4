const express = require('express');

const router = express.Router();
usersController = require('../controllers/users');

router.get('/', (req, res) => {
    usersController.getAllUsers()
        .then(users => res.json(users));
});

module.exports = router;
