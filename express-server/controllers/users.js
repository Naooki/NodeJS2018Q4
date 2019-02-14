const users = require('../models/users');

module.exports = {
    getAllUsers: () => Promise.resolve(users),
};
