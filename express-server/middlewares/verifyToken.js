const jwt = require('jsonwebtoken');

const config = require('../config/config.json');
const resp = require('../utils/response');

module.exports = (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        res.status(403);
        return res.send(resp('Forbidden', 'No access token.'));
    }

    return jwt.verify(token, config.jwtCredentials.secret, (err, decoded) => {
        if (err) {
            res.status(403);
            return res.send(resp('Forbidden', 'Invalid access token.'));
        }

        const { email, password } = decoded;
        const { email: CONFIG_EMAIL, password: CONFIG_PASSWORD } = config.userCredentials;

        if (email !== CONFIG_EMAIL || password !== CONFIG_PASSWORD) {
            res.status(403);
            return res.send(resp('Forbidden', 'Invalid access token.'));
        }

        return next();
    });
};
