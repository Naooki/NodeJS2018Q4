const _ = require('lodash');
const jwt = require('jsonwebtoken');

const config = require('../config/config.json');
const resp = require('../utils/response');


module.exports = {
    auth: (req, res) => {
        if (!_.size(req.body)) {
            res.status(403);
            return res.send(resp('Forbidden.', 'No credentials.'));
        }

        const { email, password } = req.body;
        const { username, email: CONFIG_EMAIL, password: CONFIG_PASSWORD } = config.userCredentials;

        if (email !== CONFIG_EMAIL || password !== CONFIG_PASSWORD) {
            res.status(403);
            return res.send(resp('Forbidden', 'Invalid credentials.'));
        }

        const payload = {
            email,
            password,
        };

        const token = jwt.sign(payload, config.jwtCredentials.secret);

        res.status(200);
        return res.send(resp('OK', {
            user: { email, username, password },
        }, token));
    },
};
